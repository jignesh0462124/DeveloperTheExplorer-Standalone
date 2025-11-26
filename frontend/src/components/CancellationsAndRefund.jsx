import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

const CancellationsAndRefund = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1>There will not be any refunds for cancellations</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CancellationsAndRefund;
