
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ShieldCheck, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Checkout: React.FC = () => {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', zip: '', country: 'US'
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10;
  const total = subtotal + shipping;

  if (cart.length === 0 && step !== 3) {
    return <div className="py-40 text-center uppercase tracking-widest text-zinc-500">Your cart is empty</div>;
  }

  const handleNext = () => setStep(step + 1);

  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="flex justify-center">
            <CheckCircle2 className="w-20 h-20 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter uppercase italic">Order Confirmed!</h1>
          <p className="text-zinc-500 text-sm uppercase">Order #TX-829374 is being processed. You will receive a confirmation email shortly.</p>
          <button 
            onClick={() => { clearCart(); navigate('/'); }}
            className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs"
          >
            Return to Store
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-7 space-y-12">
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] mb-12">
              <span className={step >= 1 ? 'text-white' : 'text-zinc-600'}>Information</span>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
              <span className={step >= 2 ? 'text-white' : 'text-zinc-600'}>Payment</span>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
              <span className="text-zinc-600">Confirmation</span>
            </div>

            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold tracking-tight uppercase mb-6">Contact Information</h2>
                  <input type="email" placeholder="Email" className="w-full bg-transparent border border-zinc-800 p-4 outline-none focus:border-white transition-colors" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight uppercase mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" className="bg-transparent border border-zinc-800 p-4 outline-none focus:border-white transition-colors" />
                    <input type="text" placeholder="Last Name" className="bg-transparent border border-zinc-800 p-4 outline-none focus:border-white transition-colors" />
                    <input type="text" placeholder="Address" className="col-span-2 bg-transparent border border-zinc-800 p-4 outline-none focus:border-white transition-colors" />
                    <input type="text" placeholder="City" className="bg-transparent border border-zinc-800 p-4 outline-none focus:border-white transition-colors" />
                    <input type="text" placeholder="Zip Code" className="bg-transparent border border-zinc-800 p-4 outline-none focus:border-white transition-colors" />
                  </div>
                </div>
                <button 
                  onClick={handleNext}
                  className="w-full py-5 bg-white text-black font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold tracking-tight uppercase mb-6 text-white border-b border-zinc-800 pb-2">Select Payment Method</h2>
                  <div className="space-y-4">
                    <div className="p-4 border border-white bg-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full border-4 border-white"></div>
                        <span className="text-sm font-bold uppercase">Credit Card</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-8 h-5 bg-zinc-800 rounded"></div>
                        <div className="w-8 h-5 bg-zinc-800 rounded"></div>
                      </div>
                    </div>
                    <div className="p-4 border border-zinc-800 flex items-center gap-3 opacity-50">
                      <div className="w-4 h-4 rounded-full border border-zinc-800"></div>
                      <span className="text-sm font-bold uppercase">PayPal</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <input type="text" placeholder="Card Number" className="w-full bg-transparent border border-zinc-800 p-4 outline-none focus:border-white transition-colors" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Exp Date (MM/YY)" className="bg-transparent border border-zinc-800 p-4 outline-none focus:border-white transition-colors" />
                    <input type="text" placeholder="CVV" className="bg-transparent border border-zinc-800 p-4 outline-none focus:border-white transition-colors" />
                  </div>
                </div>

                <button 
                  onClick={handleNext}
                  className="w-full py-5 bg-white text-black font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                  Pay Now — ${total}
                </button>
              </motion.div>
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-zinc-900/50 p-8 border border-zinc-900 rounded-sm">
              <h2 className="text-xl font-bold tracking-tight uppercase mb-8">Order Summary</h2>
              <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative">
                      <img src={item.image} alt={item.name} className="w-16 h-20 object-cover bg-zinc-800" />
                      <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-zinc-900">{item.quantity}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold uppercase">{item.name}</h4>
                      <p className="text-[10px] text-zinc-500 uppercase mt-1">{item.color} / {item.size}</p>
                    </div>
                    <span className="text-xs font-bold">${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-zinc-800 text-xs font-bold uppercase tracking-widest">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Shipping</span>
                  <span>${shipping}</span>
                </div>
                <div className="flex justify-between text-lg tracking-tighter pt-4 border-t border-zinc-800">
                  <span className="italic">Total</span>
                  <span className="italic">${total}</span>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                <span>Your data is encrypted and secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
