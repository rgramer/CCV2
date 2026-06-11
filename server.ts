import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

const INCLUDED_SEATS = 5;
const LAUNCH_FIRST_MONTH_PRICE_CENTS = 900;
const BASE_MONTHLY_PRICE_CENTS = 2900;
const EXTRA_SEAT_PRICE_CENTS = 500;
const LAUNCH_DISCOUNT_CENTS =
  BASE_MONTHLY_PRICE_CENTS - LAUNCH_FIRST_MONTH_PRICE_CENTS;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Proxy route for images to bypass CORS
  app.get('/api/proxy-image', async (req, res) => {
    try {
      const imageUrl = req.query.url;
      if (!imageUrl || typeof imageUrl !== 'string') {
        return res.status(400).send('Missing url parameter');
      }

      console.log(`Proxying image: ${imageUrl}`);
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType) {
        res.setHeader('Content-Type', contentType);
      }
      
      // We set permissive CORS headers on our proxy response
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for a day

      const arrayBuffer = await response.arrayBuffer();
      res.send(Buffer.from(arrayBuffer));
      
    } catch (error) {
      console.error('Error proxying image:', error);
      res.status(500).send('Error proxying image');
    }
  });

  // Create Stripe Checkout Session (Supports both real Stripe and safe sandbox simulation)
  app.post('/api/create-checkout-session', async (req, res) => {
    try {
      const { totalUsers } = req.body;
      const requestedUsers = Number.parseInt(String(totalUsers), 10);
      const numUsers = Math.max(
        INCLUDED_SEATS,
        Number.isFinite(requestedUsers) ? requestedUsers : INCLUDED_SEATS,
      );
      const additionalUsers = Math.max(0, numUsers - INCLUDED_SEATS);
      
      const firstMonthPriceCents =
        LAUNCH_FIRST_MONTH_PRICE_CENTS +
        additionalUsers * EXTRA_SEAT_PRICE_CENTS;
      const monthlyPriceAfterCents =
        BASE_MONTHLY_PRICE_CENTS + additionalUsers * EXTRA_SEAT_PRICE_CENTS;
      const firstMonthPrice = firstMonthPriceCents / 100;
      const monthlyPriceAfter = monthlyPriceAfterCents / 100;

      const stripeKey = process.env.STRIPE_SECRET_KEY;
      const appUrl = process.env.APP_URL || `http://${req.headers.host || 'localhost:3000'}`;

      if (stripeKey && stripeKey.trim() !== '' && !stripeKey.includes('YOUR_')) {
        // Safe lazy-initialization of Stripe to prevent startup crashes
        const StripeModule = await import('stripe');
        const Stripe = StripeModule.default;
        const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' as any });
        const launchCouponId = process.env.STRIPE_LAUNCH_COUPON_ID?.trim();
        const launchCoupon =
          launchCouponId ||
          (
            await stripe.coupons.create({
              amount_off: LAUNCH_DISCOUNT_CENTS,
              currency: 'usd',
              duration: 'once',
              name: 'ConciseCap launch first-month offer',
              metadata: {
                offer: 'launch_first_month',
                base_monthly_price_cents: String(BASE_MONTHLY_PRICE_CENTS),
                launch_first_month_price_cents: String(
                  LAUNCH_FIRST_MONTH_PRICE_CENTS,
                ),
              },
            })
          ).id;
        const lineItems: any[] = [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'ConciseCap Team Plan',
                description: `Field documentation plan (${INCLUDED_SEATS} included seats + ${additionalUsers} paid extra seats)`,
              },
              unit_amount: BASE_MONTHLY_PRICE_CENTS,
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ];

        if (additionalUsers > 0) {
          lineItems.push({
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'ConciseCap Extra Seat',
                description: '$5 per additional user per month',
              },
              unit_amount: EXTRA_SEAT_PRICE_CENTS,
              recurring: {
                interval: 'month',
              },
            },
            quantity: additionalUsers,
          });
        }

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: lineItems,
          discounts: [{ coupon: launchCoupon }],
          mode: 'subscription',
          success_url: `${appUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${appUrl}/payment-cancelled`,
          metadata: {
            plan: 'team',
            included_seats: String(INCLUDED_SEATS),
            extra_seats: String(additionalUsers),
            total_users: String(numUsers),
            launch_first_month_price_cents: String(firstMonthPriceCents),
            recurring_monthly_price_cents: String(monthlyPriceAfterCents),
            extra_seat_price_cents: String(EXTRA_SEAT_PRICE_CENTS),
          },
          subscription_data: {
            metadata: {
              plan: 'team',
              included_seats: String(INCLUDED_SEATS),
              extra_seats: String(additionalUsers),
              total_users: String(numUsers),
              launch_first_month_price_cents: String(firstMonthPriceCents),
              recurring_monthly_price_cents: String(monthlyPriceAfterCents),
              extra_seat_price_cents: String(EXTRA_SEAT_PRICE_CENTS),
            },
          },
        });

        return res.json({
          url: session.url,
          pricing: {
            includedSeats: INCLUDED_SEATS,
            extraSeats: additionalUsers,
            totalUsers: numUsers,
            firstMonthPriceCents,
            recurringMonthlyPriceCents: monthlyPriceAfterCents,
            extraSeatPriceCents: EXTRA_SEAT_PRICE_CENTS,
          },
        });
      } else {
        // Secure Checkout simulation fallback URL
        const simulatedUrl = `/stripe-checkout-sim?total_users=${numUsers}&additional_users=${additionalUsers}&first_price=${firstMonthPrice}&monthly_price=${monthlyPriceAfter}&success_url=${encodeURIComponent('/payment-success')}&cancel_url=${encodeURIComponent('/payment-cancelled')}`;
        return res.json({
          url: simulatedUrl,
          pricing: {
            includedSeats: INCLUDED_SEATS,
            extraSeats: additionalUsers,
            totalUsers: numUsers,
            firstMonthPriceCents,
            recurringMonthlyPriceCents: monthlyPriceAfterCents,
            extraSeatPriceCents: EXTRA_SEAT_PRICE_CENTS,
          },
        });
      }
    } catch (error: any) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: error.message || 'Error initializing secure Stripe checkout session' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
