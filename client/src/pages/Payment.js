import React, { useState, useEffect, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ experienceLevel, amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post('/api/payments/create-payment-intent', {
        experienceLevel,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      const { error: stripeError } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(stripeError.message);
      } else {
        onSuccess();
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Experience Level</label>
        <p className="text-lg font-semibold capitalize">{experienceLevel}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Amount</label>
        <p className="text-lg font-semibold">₹{amount}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Card Details</label>
        <div className="border border-gray-300 rounded-md p-3">
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </div>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

const Payment = () => {
  const [experienceLevel, setExperienceLevel] = useState('fresh');
  const [amount, setAmount] = useState(2000);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPaymentStatus = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/payments/status', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPaymentStatus(data.paymentStatus);
      setExperienceLevel(data.experienceLevel);
      setAmount(data.paymentAmount || getAmount(data.experienceLevel));
    } catch (error) {
      console.error('Error fetching payment status:', error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPaymentStatus();
  }, [fetchPaymentStatus]);

  const getAmount = (level) => {
    const amounts = { fresh: 2000, middle: 4000, senior: 9000 };
    return amounts[level] || 2000;
  };

  const handleExperienceChange = (level) => {
    setExperienceLevel(level);
    setAmount(getAmount(level));
  };

  const handlePaymentSuccess = () => {
    setPaymentStatus('paid');
    alert('Payment successful! You can now access placement services.');
  };

  if (loading) {
    return <div className="container mx-auto p-8">Loading...</div>;
  }

  if (paymentStatus === 'paid') {
    return (
      <div className="container mx-auto p-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Payment Status</h1>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <p className="font-bold">Payment Completed!</p>
            <p>You have successfully paid for {experienceLevel} level placements.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Placement Payment</h1>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Select Experience Level</label>
          <select
            value={experienceLevel}
            onChange={(e) => handleExperienceChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="fresh">Fresh Graduate - ₹2000</option>
            <option value="middle">Middle Experience - ₹4000</option>
            <option value="senior">Senior Level - ₹9000</option>
          </select>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            experienceLevel={experienceLevel}
            amount={amount}
            onSuccess={handlePaymentSuccess}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
