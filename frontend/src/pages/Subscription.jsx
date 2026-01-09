import { useState } from 'react';
import { Check, Star, Zap, Shield, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Subscription = () => {
  const { user, checkAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const hasPro = user?.subscription?.tier === 'pro';

  const handleUpgrade = async () => {
    if (hasPro) return;
    
    setLoading(true);
    try {
      // 1. Create Order
      const { data: { data: order } } = await api.post('/subscriptions/create-order');

      // 2. Open Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Ensure this is in your frontend .env
        amount: order.amount,
        currency: order.currency,
        name: "Portivo Pro",
        description: "Upgrade to Portivo Pro Plan",
        order_id: order.id,
        handler: async function (response) {
          try {
            // 3. Verify Payment
            await api.post('/subscriptions/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            
            // 4. Refresh User Data & Redirect
            await checkAuth();
            alert('Upgrade successful! Welcome to Pro.');
            navigate('/dashboard');
          } catch (error) {
            console.error(error);
            alert('Payment verification failed.');
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#9333ea", // Purple-600
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Upgrade failed:', error);
      alert('Failed to initiate upgrade. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      id: 'free',
      name: 'Free Plan',
      price: '₹0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '1 Portfolio Template',
        'Basic Profile',
        'Standard Support',
      ],
      current: !hasPro,
      action: null
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: '₹199',
      period: 'per month',
      description: 'Best for professionals',
      features: [
        'All Portfolio Templates',
        'AI Analysis & Insights',
        'Unlimited Projects',
        'Priority Support',
        'Custom Domain Support',
        'Verified Badge',
      ],
      popular: true,
      current: hasPro,
      action: handleUpgrade
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-text-primary mb-4">Subscription Plans</h1>
          <p className="text-xl text-text-secondary mb-8">
            Unlock the full potential of your portfolio with Portivo Pro
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-card rounded-xl p-8 border-2 flex flex-col ${
                  plan.popular
                    ? 'border-purple-main ring-2 ring-purple-500/20'
                    : 'border-zinc-800'
                } ${plan.current ? 'bg-zinc-900/50' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-main text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-text-primary">{plan.price}</span>
                    <span className="text-text-secondary">/{plan.period}</span>
                  </div>
                  <p className="text-text-secondary">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={plan.action}
                  disabled={plan.current || loading}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                    plan.current
                      ? 'bg-zinc-800 text-zinc-500 cursor-default'
                      : plan.popular
                      ? 'bg-purple-main hover:bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                  }`}
                >
                  {loading && plan.id === 'pro' ? 'Processing...' : plan.current ? 'Current Plan' : plan.id === 'pro' ? 'Upgrade Now' : 'Free Forever'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 border-t border-zinc-800 pt-12">
            <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Can I cancel anytime?</h3>
                    <p className="text-text-secondary">Yes, you can cancel your subscription at any time. Your access will continue until the end of the billing period.</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">What payment methods do you accept?</h3>
                    <p className="text-text-secondary">We accept all major credit/debit cards, UPI, and net banking via Razorpay.</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Is my data safe?</h3>
                    <p className="text-text-secondary">Absolutely. We use industry-standard encryption and never store your payment details on our servers.</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Do I get an invoice?</h3>
                    <p className="text-text-secondary">Yes, an invoice is generated and sent to your email immediately after payment.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
