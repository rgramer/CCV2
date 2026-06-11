import { useEffect } from 'react';

interface PrivacyPolicyPageProps {
  navigate: (path: string) => void;
  isDarkMode: boolean;
}

export function PrivacyPolicyPage({ navigate, isDarkMode }: PrivacyPolicyPageProps) {
  useEffect(() => {
    document.title = 'Privacy Policy | ConciseCap';
  }, []);

  return (
    <div className="py-16 max-w-4xl mx-auto space-y-8 px-4 sm:px-6 select-text overflow-hidden">
      <div className="text-center space-y-2">
        <h1 className={`text-3xl sm:text-4xl font-serif tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Privacy Policy
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
          This Privacy Policy describes how Infogito LLC, a New York limited liability company doing business as ConciseCap ("Infogito," "ConciseCap," "we," "us," or "our"), collects, uses, shares, and protects information in connection with the ConciseCap mobile application, web application, websites, and related services (collectively, the "Service").
        </p>

        <p>
          By using the Service, you agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy is incorporated into and subject to our Terms of Service.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          1. Who This Policy Applies To
        </h2>
        <p>This Privacy Policy applies to:</p>
        <ul className="list-disc list-inside pl-2 space-y-2">
          <li><strong>Account holders and users</strong> — the trades businesses, owners, administrators, and technicians who register for and use the Service ("Users").</li>
          <li><strong>Visitors</strong> — people who visit our websites.</li>
        </ul>
        <p>
          It also describes how we handle information about <strong>third parties</strong> whose data is captured or uploaded by our Users, such as our Users' customers ("Third-Party Individuals"). Please see Section 7 regarding Third-Party Data and the responsibilities of our Users.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          2. Information We Collect
        </h2>
        <p>We collect the following categories of information:</p>

        <h3 className="font-bold text-sm">2.1 Information You Provide Directly</h3>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li><strong>Account information</strong> — name, email address, phone number, company name, trade type, password, and profile photo.</li>
          <li><strong>Billing information</strong> — billing contact details and subscription information. Payment card details are collected and processed directly by our third-party payment processors and are not stored on our systems.</li>
          <li><strong>Communications</strong> — information you provide when you contact us for support or other inquiries.</li>
        </ul>

        <h3 className="font-bold text-sm">2.2 Job and Content Data</h3>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li><strong>Captured media</strong> — photographs, video, and audio/voice recordings you create or upload through the Service.</li>
          <li><strong>Job records</strong> — job descriptions, locations, addresses, customer names and contact details, equipment information, defect descriptions, work performed, invoices, line items, and related documentation.</li>
          <li><strong>Signatures</strong> — electronic signatures collected from your customers acknowledging completed work.</li>
          <li><strong>Transcriptions and derived content</strong> — text transcriptions of voice recordings and content extracted or generated from your captured media by our automated systems.</li>
        </ul>

        <h3 className="font-bold text-sm">2.3 Metadata</h3>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li><strong>File metadata</strong> — including EXIF data embedded in photos and videos, such as timestamps, GPS coordinates, and device model.</li>
          <li><strong>Location data</strong> — geolocation associated with jobs and captures, where available and permitted.</li>
        </ul>

        <h3 className="font-bold text-sm">2.4 Device and Technical Information</h3>
        <p>
          Device type, model, operating system, browser type, app version, IP address, and unique device identifiers. Whether the Service is accessed as an installed application or through a browser, and screen and viewport characteristics.
        </p>

        <h3 className="font-bold text-sm">2.5 Mobile App Permissions and Platform Data</h3>
        <p>
          When you use the native mobile application, the Service may request permission to access your camera, microphone, photo library or media picker, location, notifications, network status, and local files or storage, depending on the feature you choose to use. We use these permissions to capture and upload job media, attach job location context, send relevant job or account notifications, and operate the mobile app.
        </p>
        <p>
          If biometric login is available, fingerprint, Face ID, Touch ID, or similar biometric verification is handled by your device operating system. ConciseCap does not receive or store biometric templates.
        </p>
        <p>
          If you install or test the Service through Apple TestFlight, the Apple App Store, Google Play testing tracks, or a similar distribution platform, that platform provider may process account, tester, install, device, crash, diagnostics, and usage information under its own terms and privacy policy.
        </p>

        <h3 className="font-bold text-sm">2.6 Usage and Analytics Information</h3>
        <p>We collect detailed information about how you interact with the Service, including:</p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>Pages and screens viewed, features used, buttons and elements clicked, searches performed, and time spent on each screen.</li>
          <li>Session information, navigation paths, scroll depth, and interaction patterns.</li>
          <li>Capture session activity, including counts and types of captures and how documentation is completed.</li>
          <li>Errors encountered and performance data.</li>
        </ul>

        <h3 className="font-bold text-sm">2.7 Payment Integration Information</h3>
        <p>
          When you connect a third-party payment provider (such as Stripe, Square, QuickBooks, or PayPal), we collect and store authentication tokens and account identifiers necessary to generate payment links and confirm payment status. We store these tokens in encrypted form. We do not collect or store your customers' payment card or bank account numbers.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          3. How We Collect Information
        </h2>
        <p>We collect information:</p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li><strong>Directly from you</strong>, when you register, configure your account, upload content, or communicate with us.</li>
          <li><strong>Automatically</strong>, through your use of the Service, including via cookies, similar technologies, and our analytics systems.</li>
          <li><strong>From third parties</strong>, such as payment processors and integration partners, in connection with services you authorize.</li>
        </ul>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          4. How We Use Information
        </h2>
        <p>We use the information we collect for the following purposes:</p>

        <h3 className="font-bold text-sm">4.1 To Provide and Operate the Service</h3>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>Create and manage accounts, authenticate users, and provide core functionality;</li>
          <li>Process and analyze captured media to generate documentation, summaries, transcriptions, defect and equipment classifications, and verification results;</li>
          <li>Generate invoices and documentation packages, and facilitate payment collection through connected providers;</li>
          <li>Send notifications, including job status updates and retake requests.</li>
        </ul>

        <h3 className="font-bold text-sm">4.2 To Improve and Develop the Service</h3>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>Understand how the Service is used and improve its features, design, and performance;</li>
          <li>Develop new products, features, and services;</li>
          <li>Train, evaluate, test, maintain, secure, and improve our automated systems, machine learning models, and artificial intelligence, using information in identifiable form only where permitted by law and consistent with this Privacy Policy, and using aggregated or de-identified information where required or appropriate.</li>
        </ul>

        <h3 className="font-bold text-sm">4.3 To Process Payments and Manage Subscriptions</h3>
        <p>Process subscription fees through our payment processors and manage billing and renewals.</p>

        <h3 className="font-bold text-sm">4.4 To Communicate With You</h3>
        <p>Respond to inquiries, provide support, and send administrative, transactional, and (where permitted) promotional communications.</p>

        <h3 className="font-bold text-sm">4.5 To Maintain Safety, Security, and Compliance</h3>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>Detect, prevent, and address fraud, security incidents, and violations of our Terms;</li>
          <li>Comply with legal obligations and enforce our agreements.</li>
        </ul>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          5. Aggregated, De-Identified, and Non-Personal Data
        </h2>
        <p>
          We may create aggregated, anonymized, de-identified, statistical, or otherwise non-personal data from information collected through the Service, including from captured media, metadata, equipment and defect records, transcriptions, job records, invoices, signatures, usage data, and other Service activity (collectively, <strong>"Non-Personal Data"</strong>). Non-Personal Data does not reasonably identify you, your business, your users, your customers, a job, a property, or any individual.
        </p>
        <p>
          To the maximum extent permitted by law, ConciseCap may use, retain, reproduce, analyze, disclose, license, sell, commercialize, and otherwise exploit Non-Personal Data for any lawful business purpose, including to:
        </p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>operate, maintain, secure, evaluate, and improve the Service;</li>
          <li>train, test, evaluate, validate, and improve artificial intelligence, machine learning, computer vision, transcription, classification, and automation systems;</li>
          <li>develop new products, services, features, workflows, datasets, benchmarks, analytics, scores, reports, business intelligence, market intelligence, and industry insights;</li>
          <li>understand trades workflows, equipment trends, defect patterns, documentation quality, feature usage, operational performance, and payment or invoice patterns;</li>
          <li>create, publish, license, sell, or commercialize datasets, benchmarks, analytics, reports, insights, and other derivative materials that do not reasonably identify a person, customer, job, property, or business; and</li>
          <li>conduct research, product development, commercial analysis, and other lawful business activities.</li>
        </ul>
        <p>
          ConciseCap owns all rights in the generalized analytics, models, scores, benchmarks, datasets, reports, insights, improvements, and other materials it creates from Non-Personal Data. You continue to own your User Content as described in our Terms of Service. We may continue to use and retain Non-Personal Data after your account is terminated, and Non-Personal Data may not be subject to deletion requests because it does not identify an individual or business.
        </p>
        <p>
          Where applicable law requires information to be aggregated, anonymized, or de-identified before we use it for a particular purpose, we will use reasonable measures designed to prevent the information from being associated with or linked to a specific individual, business, customer, job, or property, and we will not attempt to re-identify it except where permitted by law for security, integrity, debugging, compliance, or enforcement purposes. Please review Section 10 of our Terms of Service for additional detail regarding data rights.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          6. Artificial Intelligence and Machine Learning
        </h2>
        <p>
          The Service uses automated systems, machine learning, and artificial intelligence to analyze captured media and other content, including to identify and classify equipment and defects, transcribe audio, extract data, generate summaries and documentation, and assess completeness.
        </p>
        <p>
          We may process User Content, Third-Party Data, metadata, usage data, and other information through AI Features to provide, operate, maintain, secure, evaluate, test, and improve the Service. This may include using information to improve transcription quality, equipment recognition, defect classification, document generation, completeness checks, fraud prevention, reliability, safety, and product performance.
        </p>
        <p>
          Where permitted by law and consistent with this Privacy Policy, we may use information processed through the Service to train, evaluate, validate, and improve ConciseCap's automated systems, machine learning models, and artificial intelligence. For broader analytics, benchmarking, dataset creation, model training, research, licensing, sale, or other commercial uses that do not require identifiable information, we may use Non-Personal Data as described in Section 5.
        </p>
        <p>
          We do not allow third-party general-purpose AI providers to use your identifiable User Content or Third-Party Data to train their own models unless we disclose that practice, obtain legally required consent, or you direct us to use a provider that does so. You are responsible for verifying the accuracy of all automated output, as described in our Terms of Service.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          7. Third-Party Data and Customer Information
        </h2>
        <p>
          In the course of using the Service, our Users capture and upload information about their own customers and other third parties, including photographs and video that may depict people, property, and premises; voice recordings; names; addresses; contact information; and signatures ("Third-Party Data").
        </p>
        <p>
          With respect to Third-Party Data:
        </p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>Our Users determine what Third-Party Data is collected and how it is used. The User is the controller of Third-Party Data, and ConciseCap acts as a processor on the User's behalf and at the User's direction.</li>
          <li><strong>Our Users are solely responsible for providing all legally required notices to, and obtaining all legally required consents from, the individuals whose information is captured or uploaded</strong>, including consent to be photographed or recorded and consent to the processing of their personal information as described in this Privacy Policy.</li>
          <li>If you are a Third-Party Individual and wish to exercise rights regarding your information, you should contact the relevant trades business (our User) directly, as they control that information. You may also contact us at the address below and we will assist as appropriate or direct your request to the relevant User.</li>
        </ul>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          8. How We Share Information
        </h2>
        <p>
          We do not sell personal information that identifies you, your business, your users, your customers, or any individual. We may share information in the following circumstances:
        </p>

        <h3 className="font-bold text-sm">8.1 Service Providers</h3>
        <p>
          We share information with third-party vendors and service providers who perform services on our behalf, such as cloud hosting and storage, data processing, analytics, transcription, AI processing, email delivery, and customer support. These providers are authorized to use the information only as necessary to provide services to us.
        </p>

        <h3 className="font-bold text-sm">8.2 Payment Processors and Integrations</h3>
        <p>
          We share information with payment processors and integration partners (such as Stripe, Square, QuickBooks, and PayPal) as necessary to process subscription payments and to enable payment collection features you authorize.
        </p>

        <h3 className="font-bold text-sm">8.3 App Stores and Platform Providers</h3>
        <p>
          If you install, purchase, subscribe, or test the Service through Apple, Google, or another app store or testing platform, we may share information with that provider as needed to distribute the app, manage testing, process purchases or subscriptions, provide crash reporting, comply with platform requirements, and support the Service. Those providers may also collect information directly from you under their own terms and privacy policies.
        </p>

        <h3 className="font-bold text-sm">8.4 Legal and Safety</h3>
        <p>
          We may disclose information if required to do so by law or in the good-faith belief that such disclosure is necessary to comply with legal process, enforce our Terms, protect our rights or the rights of others, or address fraud, security, or safety issues.
        </p>

        <h3 className="font-bold text-sm">8.5 Business Transfers</h3>
        <p>
          If we are involved in a merger, acquisition, financing, reorganization, bankruptcy, or sale of all or part of our assets, your information may be transferred as part of that transaction. We will provide notice as required by law.
        </p>

        <h3 className="font-bold text-sm">8.6 Non-Personal Data</h3>
        <p>
          As described in Section 5, we may share, license, sell, commercialize, or otherwise disclose Non-Personal Data that does not reasonably identify a person, customer, job, property, or business for any lawful purpose.
        </p>

        <h3 className="font-bold text-sm">8.7 With Your Direction</h3>
        <p>We may share information at your direction or with your consent.</p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          9. Data Retention
        </h2>
        <p>
          We retain personal information for as long as necessary to provide the Service, comply with our legal obligations, resolve disputes, and enforce our agreements. We may retain certain information after account termination as required or permitted by law.
        </p>
        <p>
          As described above, Non-Personal Data may be retained indefinitely and may not be subject to deletion requests because it does not identify an individual or business.
        </p>
        <p>
          You may request deletion of your account and associated personal information as described in Section 11.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          10. Data Security
        </h2>
        <p>
          We implement commercially reasonable administrative, technical, and physical safeguards designed to protect information against unauthorized access, disclosure, alteration, and destruction. These measures include encryption of authentication tokens and sensitive credentials at rest, access controls, and secure data transmission.
        </p>
        <p>
          However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security. You are responsible for maintaining the confidentiality of your account credentials.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          11. Your Privacy Rights and Choices
        </h2>
        <p>
          Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, delete, or restrict the processing of your information, the right to data portability, and the right to object to certain processing.
        </p>
        <p>
          To exercise these rights, contact us at <strong>inquiry@infogito.com</strong>. We will respond as required by applicable law. We may need to verify your identity before fulfilling your request. Note that rights regarding Third-Party Data should generally be directed to the relevant User, as described in Section 7.
        </p>

        <h3 className="font-bold text-sm">California Privacy Rights</h3>
        <p>
          If you are a California resident, you may have additional rights under the California Consumer Privacy Act (CCPA) as amended, including the right to know what personal information we collect, the right to request deletion, the right to correct inaccurate information, and the right to opt out of the sale or sharing of personal information. We do not sell personal information that identifies you. If any activity involving personal information is considered a "sale" or "sharing" under applicable law, we will provide the rights and choices required by that law. To exercise your rights, contact us at the address below. We will not discriminate against you for exercising your rights.
        </p>

        <h3 className="font-bold text-sm">Other Jurisdictions</h3>
        <p>
          If you are located in a jurisdiction with applicable data protection laws, you may have additional rights under those laws. We will honor rights to the extent required by applicable law.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          12. Cookies and Tracking Technologies
        </h2>
        <p>
          We use cookies and similar technologies to operate and secure the Service, remember your preferences, and collect analytics about how the Service is used. You can control cookies through your browser settings, though disabling certain cookies may affect the functionality of the Service.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          13. Children's Privacy
        </h2>
        <p>
          The Service is intended for use by businesses and individuals who are at least 18 years of age. The Service is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected such information, we will delete it. If you believe a child has provided us with personal information, please contact us.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          14. International Users and Data Transfers
        </h2>
        <p>
          The Service is operated in the United States. If you access the Service from outside the United States, you acknowledge that your information will be transferred to, stored, and processed in the United States, where data protection laws may differ from those in your jurisdiction. By using the Service, you consent to such transfer and processing.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          15. Third-Party Links and Services
        </h2>
        <p>
          The Service may contain links to or integrate with third-party websites and services. This Privacy Policy does not apply to those third parties. We encourage you to review the privacy policies of any third-party services you use.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          16. Changes to This Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. If we make material changes, we will post the updated policy with a new "Last Updated" date and, where appropriate, provide additional notice. Your continued use of the Service after the changes take effect constitutes acceptance of the revised Privacy Policy.
        </p>

        <h2 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} pt-4 border-t border-slate-200 dark:border-white/5`}>
          17. Contact Us
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
