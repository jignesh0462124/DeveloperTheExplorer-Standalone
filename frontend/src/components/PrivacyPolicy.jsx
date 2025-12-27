import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            {/* 1 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                1. Introduction
              </h2>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and
                protect your personal information when you use our website and
                make payments through PhonePe. By accessing our platform, you
                consent to the practices described in this policy.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                2. Information We Collect
              </h2>
              <p>
                We may collect personal information such as your name, email
                address, mobile number, and transaction details. Payment-related
                data is securely processed by PhonePe and we do not store UPI
                PINs, card numbers, or banking credentials.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                3. Use of Information
              </h2>
              <p>
                The information collected is used to process transactions,
                provide services, communicate updates, comply with legal
                obligations, and improve user experience. We may also use data
                for fraud prevention and security monitoring.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                4. Payment Processing via PhonePe
              </h2>
              <p>
                All payments are processed through PhonePe, a third-party
                payment service provider. PhonePe handles transaction data in
                accordance with its privacy policy, RBI guidelines, and NPCI
                regulations.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                5. Information Sharing
              </h2>
              <p>
                We do not sell or rent your personal data. Information may be
                shared with PhonePe, banks, or regulatory authorities only when
                required for transaction processing, compliance, fraud
                prevention, or legal obligations.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                6. Data Security
              </h2>
              <p>
                We implement reasonable technical and organizational safeguards
                to protect your data. While we strive to ensure security, no
                method of transmission over the internet is completely secure.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                7. Data Retention
              </h2>
              <p>
                Personal data is retained only for as long as necessary to
                fulfill the purposes outlined in this policy or as required by
                applicable laws and regulatory requirements.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                8. User Rights
              </h2>
              <p>
                You may request access, correction, or deletion of your personal
                data, subject to legal and regulatory obligations. Requests can
                be submitted through our official contact channels.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                9. Policy Updates
              </h2>
              <p>
                This Privacy Policy may be updated periodically to reflect
                changes in payment regulations or PhonePe policies. Continued
                use of the platform constitutes acceptance of the updated
                policy.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                10. Governing Law
              </h2>
              <p>
                This Privacy Policy shall be governed by and interpreted in
                accordance with the laws of India.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
