import React from "react";

function Checkout() {
  const handlePayment = async () => {
    const options = {
      key: import.meta.env.VITE_TEST_API_KEY,
      amount: 50000, 
      currency: "INR",
      name: "Developer to Explorer",
      description: "Test Payment",
      image: "https://razorpay.com/favicon.png",
      handler: function (response) {
        alert("Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#0d6efd",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <h2>Test Razorpay Payment Page</h2>
      <button
        onClick={handlePayment}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0d6efd",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Pay ₹500
      </button>
    </div>
  );
}

export default Checkout;
