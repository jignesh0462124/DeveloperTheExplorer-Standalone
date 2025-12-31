import React from 'react';

import Footer from './Footer';

const CancellationsAndRefund = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-10 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="mb-6">
            <a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5"/>
                    <path d="M12 19l-7-7 7-7"/>
                </svg>
                Back to Home
            </a>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1>There will not be any refunds for cancellations</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CancellationsAndRefund;
