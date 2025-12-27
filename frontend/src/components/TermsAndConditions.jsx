import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Terms and Conditions
          </h1>

          <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            {/* 1 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using this website and making payments through
                PhonePe, you agree to comply with and be legally bound by these
                Terms and Conditions, along with applicable PhonePe policies,
                guidelines, and RBI regulations.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                2. Payment Services
              </h2>
              <p>
                Payments on this platform are processed using PhonePe as a
                third-party payment service provider. We do not store or process
                sensitive payment information such as UPI PINs, card numbers, or
                banking credentials.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                3. User Responsibilities
              </h2>
              <p>
                You agree to provide accurate payment and personal information
                while initiating transactions. You are solely responsible for
                maintaining the confidentiality of your PhonePe account and
                authorizing transactions initiated through your device.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                4. Transaction Authorization
              </h2>
              <p>
                All transactions initiated through PhonePe are considered final
                and authorized by you. Once a payment is successfully completed,
                it cannot be reversed except as permitted under applicable refund
                or dispute policies.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                5. Refunds and Chargebacks
              </h2>
              <p>
                Refunds, if applicable, will be processed back to the original
                payment source via PhonePe within the timelines defined by
                banking partners. Chargebacks or disputes raised will be handled
                as per PhonePe and NPCI guidelines.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                6. Failed or Delayed Transactions
              </h2>
              <p>
                We shall not be held responsible for transaction failures caused
                due to network issues, bank downtime, incorrect UPI details, or
                factors beyond our control. Any debited amount will be refunded
                automatically as per PhonePe settlement rules.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                7. Compliance and KYC
              </h2>
              <p>
                PhonePe may require users or merchants to complete KYC
                verification in compliance with RBI regulations. Failure to
                complete KYC may result in transaction limits or suspension of
                services.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                8. Limitation of Liability
              </h2>
              <p>
                We and PhonePe shall not be liable for any indirect, incidental,
                consequential, or punitive damages arising from payment failures,
                unauthorized access, or third-party service interruptions.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                9. Modifications to Terms
              </h2>
              <p>
                These Terms may be updated periodically to reflect changes in
                payment regulations or PhonePe policies. Continued use of the
                platform constitutes acceptance of the revised terms.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                10. Governing Law
              </h2>
              <p>
                These Terms and Conditions shall be governed and interpreted in
                accordance with the laws of India. Any disputes shall be subject
                to the exclusive jurisdiction of Indian courts.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
