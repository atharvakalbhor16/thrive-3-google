
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/useStore';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { PLP } from './pages/PLP';
import { PDP } from './pages/PDP';
import { Checkout } from './pages/Checkout';

// Auth and Account components could be simplified for the demo
const Auth: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
    <div className="max-w-md w-full space-y-8 text-center">
      <h1 className="text-4xl font-bold tracking-tighter uppercase italic">Account Access</h1>
      <div className="space-y-4">
        <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-zinc-900 border border-zinc-800 p-4 outline-none focus:border-white uppercase text-xs" />
        <input type="password" placeholder="PASSWORD" className="w-full bg-zinc-900 border border-zinc-800 p-4 outline-none focus:border-white uppercase text-xs" />
        <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs">Sign In</button>
        <div className="flex justify-between text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
          <button>Forgot Password?</button>
          <button>Create Account</button>
        </div>
      </div>
    </div>
  </div>
);

const Wishlist: React.FC = () => (
  <div className="py-20 text-center uppercase tracking-widest text-zinc-500">
    <h1 className="text-4xl font-bold text-white italic mb-4">Your Wishlist</h1>
    <p>Your favorite pieces in one place.</p>
  </div>
);

const Account: React.FC = () => (
  <div className="container mx-auto px-4 py-20 uppercase tracking-tighter">
    <h1 className="text-4xl font-bold italic mb-12">My Account</h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="space-y-4 border-r border-zinc-900 pr-8">
        <button className="block w-full text-left font-bold text-white">Order History</button>
        <button className="block w-full text-left text-zinc-500 hover:text-white">Profile Settings</button>
        <button className="block w-full text-left text-zinc-500 hover:text-white">Addresses</button>
        <button className="block w-full text-left text-zinc-500 hover:text-white">Sign Out</button>
      </div>
      <div className="md:col-span-3">
        <div className="p-20 border border-zinc-900 text-center text-zinc-500 text-xs">
          You haven't placed any orders yet.
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<PLP />} />
            <Route path="/product/:slug" element={<PDP />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;
