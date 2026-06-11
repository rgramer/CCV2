import { useEffect } from 'react';

interface TermsOfServicePageProps {
  navigate: (path: string) => void;
  isDarkMode: boolean;
}

export function TermsOfServicePage({ navigate, isDarkMode }: TermsOfServicePageProps) {
  useEffect(() => {
    document.title = 'Terms of Service | ConciseCap';
  }, []);

  return (
    <div className="py-16 max-w-4xl mx-auto space-y-8 px-4 sm:px-6 select-text overflow-hidden">
      <div className="text-center space-y-2">
        <h1 className={`text-3xl sm:text-4xl font-serif tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Terms of Service
        </h1>
        <p className={`text-xs font-mono tracking-wider uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Infogito LLC & ConciseCap
        </p>
      </div>

      <div className={`p-6 sm:p-10 rounded-2xl border leading-relaxed space-y-6 text-sm ${
        isDarkMode 
          ? 'bg-slate-900/40 border-white/5 text-slate-300' 
          : 'bg-white border-slate-200 text-slate-700'
      }`}>
        <p className="font-bold border-b border-dashed pb-4 mb-4 border-slate-700/20 dark:border-white/10 text-xs font-mono uppercase tracking-widest text-blue-500">
          Last Updated: June 1, 2026
        </p>

        <p>
          These Terms of Service (the <strong>"Terms"</strong>) are a legal agreement between you and <strong>Infogito LLC</strong>, a New York limited liability company doing business as <strong>ConciseCap</strong> (<strong>"ConciseCap," "Infogito," "we," "us,"</strong> or <strong>"our"</strong>). These Terms govern your access to and use of the ConciseCap mobile application, web application, websites, software, tools, integrations, documentation workflows, and related services (collectively, the <strong>"Service"</strong>).
        </p>

        <p>
          Please read these Terms carefully. By creating an account, accessing, or using the Service, you agree to these Terms. If you do not agree, do not access or use the Service.
        </p>

        <p>
          These Terms include important provisions about subscriptions, customer data, artificial intelligence features, limitations of liability, arbitration, and a class action waiver. Please review them carefully.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          Plain-English Summary
        </h2>
        <p className="text-xs italic opacity-85">
          This summary is provided for convenience only. The full Terms below control if there is any conflict.
        </p>
        <ul className="list-disc list-inside pl-2 space-y-2 text-xs">
          <li>ConciseCap helps trades businesses document field work using photos, videos, voice notes, job records, invoices, customer acknowledgments, signatures, and AI-assisted tools.</li>
          <li>You own the content you upload or create through the Service. You give us the rights needed to operate, secure, support, analyze, improve, and develop ConciseCap.</li>
          <li>You are responsible for getting any legally required permissions from your customers, employees, subcontractors, property owners, and anyone else whose information, image, voice, property, or premises may be captured.</li>
          <li>AI-generated outputs are assistive and must be reviewed by you before you rely on them.</li>
          <li>We do not sell identifiable job records, customer information, photos, videos, audio recordings, invoices, or signatures.</li>
          <li>We may use information processed through the Service to operate, evaluate, maintain, secure, improve, and develop ConciseCap, including AI Features, where permitted by law and described in our Privacy Policy.</li>
          <li>We may use, retain, disclose, license, sell, and commercialize aggregated, anonymized, de-identified, statistical, or otherwise non-personal information for any lawful purpose, including AI training, datasets, benchmarks, analytics, reports, insights, and product development.</li>
          <li>Beta, pilot, TestFlight, Google Play testing, and other pre-release versions may be limited, unfinished, or changed before general availability.</li>
          <li>Paid subscriptions renew automatically unless canceled before renewal.</li>
        </ul>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          1. Eligibility and Authority
        </h2>
        <p>
          You must be at least 18 years old and capable of entering into a binding contract to use the Service.
        </p>
        <p>
          If you use the Service on behalf of a company, trade business, organization, or other entity, you represent that you have authority to bind that entity to these Terms. In that case, <strong>"you"</strong> and <strong>"your"</strong> refer to that entity and its authorized users.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          2. The Service
        </h2>
        <p>
          ConciseCap is a field documentation platform designed for trades professionals, including HVAC, roofing, plumbing, electrical, inspection, repair, maintenance, and similar businesses. The Service may allow users to:
        </p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>capture and organize job site photos, videos, voice notes, and written notes;</li>
          <li>create job records, invoices, scopes of work, documentation packets, and customer-facing summaries;</li>
          <li>collect customer acknowledgments, approvals, and signatures;</li>
          <li>use automated and AI-assisted tools to transcribe, summarize, classify, verify, or format job documentation;</li>
          <li>connect payment, accounting, customer management, storage, communications, and other third-party tools; and</li>
          <li>manage job workflows, records, teams, and related business operations.</li>
        </ul>
        <p>
          We may add, change, suspend, or discontinue features over time. We will make reasonable efforts to avoid materially disrupting paid users, but we do not guarantee that any particular feature, integration, workflow, or availability level will continue indefinitely.
        </p>

        <h3 className="font-bold text-sm">2.1 Pilot and Beta Services</h3>
        <p>
          We may make beta, pilot, preview, TestFlight, Google Play testing, or other pre-release versions of the Service available to selected users. These versions are provided for evaluation and feedback, may contain errors, may be incomplete, may change materially before general availability, and may be discontinued at any time.
        </p>
        <p>
          You should not rely on beta or pilot features for emergency, safety-critical, legal, insurance, warranty, tax, permitting, or regulatory decisions without independently verifying the resulting records and keeping your own backup documentation.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          3. Accounts, Workspaces, and Users
        </h2>
        <p>
          To access most features, you must create an account and provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of login credentials and for all activity under your account or workspace.
        </p>
        <p>
          The Service may support different user roles, such as owner, administrator, manager, dispatcher, technician, or viewer. Workspace owners and administrators are responsible for:
        </p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>inviting and removing users;</li>
          <li>assigning appropriate permissions;</li>
          <li>ensuring users comply with these Terms;</li>
          <li>monitoring use of the Service within the workspace; and</li>
          <li>maintaining internal policies for job documentation, customer consent, recording, privacy, and data retention.</li>
        </ul>
        <p>
          You must promptly notify us if you believe an account has been compromised or used without authorization.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          4. Subscriptions, Billing, and Taxes
        </h2>
        <h3 className="font-bold text-sm">4.1 Subscription Plans</h3>
        <p>
          Some features require a paid subscription. By purchasing a subscription, you agree to pay all fees shown at checkout, in an order form, or in the applicable plan description. Fees are stated in U.S. dollars unless otherwise specified.
        </p>
        <h3 className="font-bold text-sm">4.2 Automatic Renewal</h3>
        <p>
          Unless stated otherwise, subscriptions automatically renew at the end of each billing period until canceled. By subscribing, you authorize ConciseCap and our payment processors to charge your payment method for recurring fees, applicable taxes, and any authorized add-ons.
        </p>
        <h3 className="font-bold text-sm">4.3 Cancellation</h3>
        <p>
          You may cancel a subscription through the account settings, the applicable app store, or another method we make available. Cancellation stops future renewals but does not automatically result in a refund for the then-current billing period unless required by law or expressly stated in writing.
        </p>
        <h3 className="font-bold text-sm">4.4 Price Changes</h3>
        <p>
          We may change subscription prices or plan features. If a change materially affects your paid subscription, we will provide notice before the change takes effect. Your continued use after the effective date constitutes acceptance of the updated price or plan.
        </p>
        <h3 className="font-bold text-sm">4.5 Refunds</h3>
        <p>
          Except where required by law or expressly stated in writing, fees are non-refundable and we do not provide credits for partial billing periods, unused features, or inactive accounts.
        </p>
        <h3 className="font-bold text-sm">4.6 Taxes</h3>
        <p>
          You are responsible for taxes, duties, levies, or similar governmental assessments associated with your subscription or use of the Service, other than taxes based on our net income.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          5. Payment Collection and Financial Integrations
        </h2>
        <p>
          The Service may allow you to connect third-party payment or accounting providers, such as Stripe, Square, QuickBooks, PayPal, or other services, to generate payment links, sync invoice information, confirm payment status, or support related workflows.
        </p>
        <p>
          You acknowledge and agree that:
        </p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>ConciseCap is not a bank, money transmitter, payment processor, accountant, tax advisor, or escrow agent.</li>
          <li>ConciseCap is not a party to transactions between you and your customers.</li>
          <li>Customer payments are processed by your connected third-party provider under that provider's terms and privacy policy.</li>
          <li>You are responsible for the accuracy of invoices, line items, taxes, discounts, payment links, customer communications, and amounts due.</li>
          <li>You are responsible for disputes, refunds, chargebacks, failed payments, fees, taxes, and compliance obligations related to your customer transactions.</li>
          <li>We may store encrypted tokens, identifiers, and limited account information needed to maintain authorized integrations.</li>
        </ul>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          6. User Content
        </h2>
        <p>
          <strong>"User Content"</strong> means information, media, records, and materials submitted, uploaded, captured, generated, transmitted, or stored through the Service by you or your authorized users. User Content may include photos, videos, audio recordings, voice notes, transcriptions, job notes, customer information, addresses, equipment information, defect descriptions, invoices, signatures, approvals, documents, and related metadata.
        </p>
        <h3 className="font-bold text-sm">6.1 You Own Your User Content</h3>
        <p>
          As between you and ConciseCap, you retain ownership of your User Content. These Terms do not transfer ownership of your User Content to us.
        </p>
        <h3 className="font-bold text-sm">6.2 Permission You Give Us</h3>
        <p>
          You grant ConciseCap a limited, worldwide, non-exclusive, royalty-free license to host, store, reproduce, process, transmit, display, format, analyze, and otherwise use your User Content as reasonably necessary or permitted to:
        </p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>provide, operate, maintain, secure, monitor, debug, and support the Service;</li>
          <li>generate, format, and deliver documentation, summaries, invoices, transcriptions, verification results, payment links, acknowledgments, and other outputs you request or enable;</li>
          <li>provide customer support, troubleshoot issues, maintain reliability, prevent abuse, and enforce these Terms;</li>
          <li>test, evaluate, validate, train, maintain, and improve ConciseCap's automated systems, machine learning models, artificial intelligence, transcription, computer vision, classification, summarization, invoice-generation, and verification tools, where permitted by law and consistent with our Privacy Policy;</li>
          <li>develop, improve, and expand products, features, integrations, workflows, safety systems, quality controls, and documentation tools;</li>
          <li>comply with law, respond to legal process, enforce these Terms, and protect rights, safety, and security; and</li>
          <li>create, use, retain, disclose, license, sell, commercialize, and otherwise exploit Aggregated, De-Identified, or Non-Personal Data as described in Section 10 and our Privacy Policy.</li>
        </ul>
        <p>
          This license lasts for as long as needed to provide the Service, comply with legal obligations, resolve disputes, enforce agreements, maintain backups and business records, and exercise the data rights described in these Terms and our Privacy Policy. This license does not transfer ownership of your User Content to ConciseCap and does not allow us to sell identifiable User Content.
        </p>
        <h3 className="font-bold text-sm">6.3 Your Responsibilities for User Content</h3>
        <p>
          You represent and warrant that:
        </p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>you have all rights, permissions, notices, and consents needed to submit User Content to the Service;</li>
          <li>your User Content does not violate law, these Terms, or the rights of any person or entity;</li>
          <li>your User Content is accurate to the extent used for invoices, customer communications, warranties, rebates, permits, insurance, compliance, or legal purposes; and</li>
          <li>you will review and verify any outputs generated from your User Content before using or sharing them.</li>
        </ul>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          7. Customer and Third-Party Data
        </h2>
        <p>
          In using the Service, you may collect or upload information about people or entities that are not parties to these Terms, including your customers, tenants, property owners, employees, subcontractors, visitors, or other individuals (<strong>"Third-Party Individuals"</strong>). This may include names, contact information, addresses, photos, videos, voices, signatures, property details, equipment information, job site conditions, and payment-related information (<strong>"Third-Party Data"</strong>).
        </p>
        <p>
          You are responsible for Third-Party Data you collect, upload, or process through the Service. This includes responsibility for:
        </p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>providing legally required notices;</li>
          <li>obtaining legally required consents or authorizations;</li>
          <li>complying with recording-consent, privacy, consumer protection, employment, biometric, property-access, and trade-specific rules that apply to your business;</li>
          <li>honoring customer requests or legal obligations related to data access, correction, deletion, or restriction;</li>
          <li>ensuring your employees, technicians, subcontractors, and representatives follow your privacy and recording policies; and</li>
          <li>using the Service in a way that is appropriate for your customers, jobs, and jurisdictions.</li>
        </ul>
        <p>
          ConciseCap generally acts as a service provider or processor for Third-Party Data that you submit, and you generally act as the business, controller, or equivalent decision-maker for that data. If you need a data processing agreement or other privacy addendum, contact us.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          8. Customer Acknowledgments and Electronic Signatures
        </h2>
        <p>
          The Service may allow you to collect customer acknowledgments, approvals, initials, signatures, or similar confirmations. You are responsible for determining whether an electronic acknowledgment or signature is appropriate and legally sufficient for your intended use.
        </p>
        <p>
          ConciseCap does not guarantee that any acknowledgment, signature, documentation package, invoice, or record will satisfy legal, insurance, warranty, rebate, regulatory, tax, licensing, lien, or court requirements. You should consult qualified professionals where needed.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          9. Artificial Intelligence and Automated Features
        </h2>
        <h3 className="font-bold text-sm">9.1 AI Outputs Are Assistive</h3>
        <p>
          AI Features are designed to assist you, not replace your professional judgment. You are responsible for reviewing, correcting, approving, and verifying all outputs before relying on them or sharing them with customers, insurers, regulators, rebate programs, manufacturers, courts, or other third parties.
        </p>
        <p>
          AI outputs may be inaccurate, incomplete, outdated, mislabeled, or unsuitable for your specific job, trade, jurisdiction, customer, or compliance obligation.
        </p>
        <h3 className="font-bold text-sm">9.2 No Professional Advice</h3>
        <p>
          ConciseCap does not provide legal, tax, accounting, engineering, architectural, code-compliance, permitting, insurance, warranty, rebate, or professional trade advice. Any output generated by the Service is informational and assistive only.
        </p>
        <h3 className="font-bold text-sm">9.3 AI Processing and Improvement</h3>
        <p>
          We may process User Content, Third-Party Data, metadata, usage data, and other information through AI Features to provide, operate, maintain, secure, evaluate, test, and improve the Service. This may include improving transcription quality, equipment recognition, defect classification, completeness checks, invoice preparation, document generation, workflow automation, reliability, safety, and product performance.
        </p>
        <p>
          Where permitted by law and consistent with our Privacy Policy, we may use information processed through the Service to train, evaluate, validate, and improve ConciseCap's automated systems, machine learning models, and artificial intelligence. For broader analytics, benchmarking, dataset creation, model training, research, licensing, sale, or other commercial uses that do not require identifiable information, we may use Aggregated, De-Identified, or Non-Personal Data as described in Section 10.
        </p>
        <p>
          We do not sell identifiable job records, customer information, photos, videos, audio recordings, invoices, or signatures. We do not allow third-party general-purpose AI providers to use your identifiable User Content to train their own models unless we disclose that practice, obtain legally required consent, or you direct us to use a provider that does so.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          10. Aggregated, De-Identified, and Non-Personal Data
        </h2>
        <p>
          ConciseCap may create aggregated, anonymized, de-identified, statistical, or otherwise non-personal data from information collected or processed through the Service, including from User Content, Third-Party Data, captured media, metadata, equipment and defect records, transcriptions, job records, invoices, signatures, payment-status data, usage data, and other Service activity (collectively, <strong>"Non-Personal Data"</strong>). Non-Personal Data does not reasonably identify you, your business, your users, your customers, a job, a property, or any individual.
        </p>
        <p>
          To the maximum extent permitted by law, ConciseCap may use, retain, reproduce, analyze, disclose, license, sell, commercialize, and otherwise exploit Non-Personal Data for any lawful business purpose, including to:
        </p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>operate, maintain, secure, evaluate, and improve the Service;</li>
          <li>train, test, evaluate, validate, and improve artificial intelligence, machine learning, computer vision, transcription, classification, and automation systems;</li>
          <li>develop new products, services, features, workflows, integrations, datasets, benchmarks, analytics, scores, reports, business intelligence, market intelligence, and industry insights;</li>
          <li>understand trades workflows, documentation quality, equipment trends, defect patterns, feature usage, operational performance, invoice patterns, and product performance;</li>
          <li>create, publish, license, sell, or commercialize datasets, benchmarks, analytics, reports, insights, and other derivative materials that do not reasonably identify a person, customer, job, property, or business; and</li>
          <li>conduct research, product development, commercial analysis, and other lawful business activities.</li>
        </ul>
        <p>
          ConciseCap owns all rights in the generalized analytics, models, scores, benchmarks, datasets, reports, insights, improvements, and other materials it creates from Non-Personal Data. You continue to own your User Content. You are not entitled to compensation, attribution, approval, or accounting for ConciseCap's creation, use, disclosure, licensing, sale, commercialization, or other exploitation of Non-Personal Data or derivative materials created from Non-Personal Data.
        </p>
        <p>
          We may retain Non-Personal Data indefinitely, including after account termination or deletion, and Non-Personal Data may not be subject to deletion requests because it does not identify an individual or business. Where applicable law requires information to be aggregated, anonymized, or de-identified before we use it for a particular purpose, we will use reasonable measures designed to prevent the information from being associated with or linked to a specific individual, business, customer, job, or property, and we will not attempt to re-identify it except where permitted by law for security, integrity, debugging, compliance, or enforcement purposes.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          11. Privacy and Security
        </h2>
        <p>
          Our collection and use of information is described in our Privacy Policy. By using the Service, you acknowledge that we will collect, use, disclose, store, and protect information as described in that policy.
        </p>
        <p>
          We use commercially reasonable administrative, technical, and physical safeguards designed to protect information. However, no method of transmission, processing, or storage is completely secure. You are responsible for using strong passwords, limiting access to authorized users, configuring permissions appropriately, and maintaining your own internal security practices.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          12. Data Export, Retention, and Backups
        </h2>
        <p>
          The Service may allow you to export or download certain User Content. You are responsible for maintaining your own copies of important records, including invoices, customer approvals, job evidence, warranty materials, tax records, and compliance documents.
        </p>
        <p>
          We may retain User Content and account information for as long as needed to provide the Service, comply with law, resolve disputes, enforce agreements, maintain backups, prevent fraud, exercise the rights described in these Terms and our Privacy Policy, and operate our business. Backup copies may persist for a limited period after deletion until overwritten in the ordinary course.
        </p>
        <p>
          We may delete or restrict access to User Content after account termination, nonpayment, inactivity, or expiration of a subscription, subject to our Privacy Policy and applicable law.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          13. Acceptable Use
        </h2>
        <p>
          You may not, and may not permit others to:
        </p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>use the Service unlawfully or in violation of these Terms;</li>
          <li>upload content that infringes, misappropriates, defames, harasses, threatens, or violates the rights of others;</li>
          <li>capture, upload, or process Third-Party Data without legally required notice or consent;</li>
          <li>use the Service for surveillance, stalking, harassment, discrimination, or unlawful profiling;</li>
          <li>submit false, misleading, fraudulent, or inaccurate job documentation, invoices, signatures, acknowledgments, or payment requests;</li>
          <li>interfere with, disrupt, overload, probe, scan, or compromise the Service or related systems;</li>
          <li>attempt to gain unauthorized access to accounts, workspaces, systems, or data;</li>
          <li>reverse engineer, decompile, disassemble, or attempt to derive source code except where permitted by law;</li>
          <li>scrape, crawl, or use automated access methods without our written permission;</li>
          <li>use the Service to develop a competing product or copy features, workflows, interfaces, or data models;</li>
          <li>resell, sublicense, rent, or commercially exploit the Service except as expressly authorized;</li>
          <li>upload malware, harmful code, or materials designed to interfere with systems; or</li>
          <li>remove proprietary notices or misrepresent your relationship with ConciseCap.</li>
        </ul>
        <p>
          We may investigate suspected violations and may remove content, suspend accounts, terminate access, notify affected parties, or report conduct to law enforcement where appropriate.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          14. Intellectual Property
        </h2>
        <p>
          The Service, including software, technology, designs, workflows, interfaces, databases, models, documentation, templates, text, graphics, logos, trademarks, and other materials, is owned by ConciseCap, Infogito LLC, or our licensors and is protected by intellectual property laws.
        </p>
        <p>
          Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for your internal business purposes.
        </p>
        <p>
          No rights are granted except as expressly stated. You may not use the names <strong>ConciseCap</strong>, <strong>Infogito</strong>, or our logos, trademarks, or branding without our prior written permission.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          15. Feedback
        </h2>
        <p>
          If you provide ideas, suggestions, comments, or feedback about the Service, you grant ConciseCap a perpetual, irrevocable, worldwide, royalty-free right to use them for any purpose without restriction or compensation. We are not required to treat feedback as confidential.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          16. Third-Party Services
        </h2>
        <p>
          The Service may link to or integrate with third-party services, including payment processors, accounting platforms, storage providers, communication tools, analytics providers, AI providers, app stores, and other business tools.
        </p>
        <p>
          Your use of third-party services is governed by their terms and privacy policies. ConciseCap is not responsible for third-party services, content, availability, security, accuracy, failures, fees, or practices.
        </p>
        <p>
          You authorize us to transmit information to and from third-party services as needed to provide the integrations you enable.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          17. Confidentiality
        </h2>
        <p>
          User Content that is not publicly available will be treated by ConciseCap as confidential business information, except that we may access, use, and disclose it as described in these Terms and our Privacy Policy, including to provide the Service, support users, use vendors, comply with law, protect safety and security, and enforce our rights.
        </p>
        <p>
          You agree to treat non-public information about the Service, including unreleased features, security information, product roadmaps, pricing not publicly posted, and beta materials, as confidential unless we authorize disclosure.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          18. Suspension and Termination
        </h2>
        <p>
          You may stop using the Service at any time. We may suspend or terminate your access if:
        </p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>you violate these Terms;</li>
          <li>fees are overdue;</li>
          <li>your use creates security, legal, operational, or reputational risk;</li>
          <li>we are required to do so by law or a third-party provider; or</li>
          <li>continued access could harm ConciseCap, users, customers, systems, or third parties.</li>
        </ul>
        <p>
          Upon termination, your right to use the Service ends immediately. Sections that by their nature should survive termination will survive, including provisions about User Content responsibilities, Non-Personal Data, intellectual property, payment obligations, disclaimers, limitations of liability, indemnification, dispute resolution, and general terms.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          19. Disclaimers
        </h2>
        <p>
          The Service is provided <strong>"as is"</strong> and <strong>"as available."</strong> To the maximum extent permitted by law, ConciseCap disclaims all warranties, whether express, implied, statutory, or otherwise, including warranties of merchantability, fitness for a particular purpose, title, non-infringement, availability, accuracy, and reliability.
        </p>
        <p>
          We do not warrant that the Service will be uninterrupted, error-free, secure, or free from harmful components. We do not warrant that outputs, transcriptions, classifications, summaries, documentation packages, invoices, alerts, integrations, or AI-generated materials will be accurate, complete, legally sufficient, or suitable for your intended purpose.
        </p>
        <p>
          You are responsible for reviewing and verifying all Service outputs and for determining whether the Service is appropriate for your business, customers, trade, jurisdiction, and compliance obligations.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          20. Limitation of Liability
        </h2>
        <p>
          To the maximum extent permitted by law, ConciseCap, Infogito LLC, and our officers, directors, members, employees, agents, contractors, service providers, and licensors will not be liable for indirect, incidental, special, consequential, exemplary, punitive, or similar damages, including lost profits, lost revenue, lost data, business interruption, loss of goodwill, substitute services, or reputational harm, arising out of or relating to the Service or these Terms, even if advised of the possibility of such damages.
        </p>
        <p>
          To the maximum extent permitted by law, our total aggregate liability for any claim arising out of or relating to the Service or these Terms will not exceed the greater of:
        </p>
        <ol className="list-decimal list-inside pl-2 space-y-1">
          <li>the amount you paid to ConciseCap for the Service in the twelve months before the event giving rise to the claim; or</li>
          <li>one hundred U.S. dollars ($100).</li>
        </ol>
        <p>
          Some jurisdictions do not allow certain exclusions or limitations, so some of the above may not apply to you.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          21. Indemnification
        </h2>
        <p>
          You agree to defend, indemnify, and hold harmless ConciseCap, Infogito LLC, and our officers, directors, members, employees, agents, contractors, service providers, and licensors from and against claims, liabilities, damages, losses, costs, and expenses, including reasonable attorneys' fees, arising out of or relating to:
        </p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>your use of the Service;</li>
          <li>your User Content;</li>
          <li>your collection, upload, processing, or use of Third-Party Data;</li>
          <li>your failure to provide required notices or obtain required consents;</li>
          <li>your invoices, payment requests, customer communications, job documentation, or representations;</li>
          <li>your violation of these Terms, law, or third-party rights; or</li>
          <li>use of the Service by your users, employees, contractors, or representatives.</li>
        </ul>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          22. Changes to the Service or Terms
        </h2>
        <p>
          We may update these Terms from time to time. If we make material changes, we will provide notice by posting an updated version with a new effective date and, where appropriate, by email, in-product notice, or another reasonable method.
        </p>
        <p>
          Your continued use of the Service after updated Terms take effect means you accept the updated Terms. If you do not agree, you must stop using the Service.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          23. Dispute Resolution, Arbitration, and Class Action Waiver
        </h2>
        <h3 className="font-bold text-sm">23.1 Informal Resolution</h3>
        <p>
          Before filing a claim, you agree to contact us at <strong>inquiry@infogito.com</strong> and attempt to resolve the dispute informally for at least thirty (30) days. This informal process does not apply where emergency injunctive relief is sought for intellectual property misuse, unauthorized access, or similar urgent harm.
        </p>
        <h3 className="font-bold text-sm">23.2 Binding Arbitration</h3>
        <p>
          Except as stated below, any dispute, claim, or controversy arising out of or relating to these Terms or the Service will be resolved by binding arbitration administered by the American Arbitration Association under its applicable rules. The arbitration will be conducted in New York, New York, unless the parties agree otherwise or the arbitrator determines that another location or remote proceeding is appropriate.
        </p>
        <p>
          Judgment on the arbitration award may be entered in any court with jurisdiction.
        </p>
        <h3 className="font-bold text-sm">23.3 Class Action Waiver</h3>
        <p>
          You and ConciseCap agree that each may bring claims against the other only in an individual capacity, and not as a plaintiff, class member, or representative in any class, collective, consolidated, private attorney general, or representative proceeding.
        </p>
        <h3 className="font-bold text-sm">23.4 Exceptions</h3>
        <p>
          Either party may bring an individual claim in small claims court if permitted by that court's rules. Either party may seek injunctive or equitable relief in court for intellectual property infringement, unauthorized access, misuse of confidential information, or security-related harm.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          24. Governing Law and Venue
        </h2>
        <p>
          These Terms are governed by the laws of the State of New York, without regard to conflict-of-law principles. Subject to the arbitration provision above, any dispute not subject to arbitration will be brought exclusively in the state or federal courts located in New York County, New York, and you consent to personal jurisdiction and venue there.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          25. App Stores
        </h2>
        <p>
          If you download the Service through an app store or platform, such as Apple App Store or Google Play, your use may also be subject to that platform's terms. The platform provider is not responsible for the Service or its content except as required by applicable law.
        </p>
        <p>
          If you access the Service through TestFlight, Google Play internal testing, Google Play closed testing, or another testing channel, you understand that the build may be a pilot or beta version and may include incomplete features, diagnostics, crash reporting, tester management, limited access, expiration, or platform feedback tools.
        </p>
        <p>
          If subscriptions or purchases are offered through an app store, billing, cancellation, refund, and renewal rules may also be governed by that platform's terms and account settings.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          26. General Terms
        </h2>
        <p>
          These Terms, together with the Privacy Policy and any applicable order form or addendum, are the entire agreement between you and ConciseCap regarding the Service.
        </p>
        <p>
          If any provision is found unenforceable, the remaining provisions will remain in effect. Our failure to enforce a provision is not a waiver. You may not assign these Terms without our prior written consent. We may assign these Terms in connection with a merger, acquisition, financing, reorganization, sale of assets, or by operation of law.
        </p>
        <p>
          We are not liable for delay or failure to perform caused by events beyond our reasonable control.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          27. Contact
        </h2>
        <p className="font-semibold text-blue-500">
          Infogito LLC d/b/a ConciseCap
        </p>
        <p>
          New York, New York<br />
          Email: <a href="mailto:inquiry@infogito.com" className="underline hover:text-blue-400">inquiry@infogito.com</a>
        </p>
      </div>

      <div className="text-center">
        <button 
          onClick={() => navigate('/')} 
          className={`px-8 py-3 rounded-xl border text-xs font-mono font-bold uppercase tracking-widest cursor-pointer transition-all hover:scale-[1.01] ${
            isDarkMode 
              ? 'bg-slate-900 border-white/10 hover:bg-slate-800 text-white' 
              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
          }`}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
