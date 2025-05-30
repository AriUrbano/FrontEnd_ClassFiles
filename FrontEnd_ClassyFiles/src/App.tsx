import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { Solution } from './components/Solution';
import { Market } from './components/Market';
import { Pricing } from './components/Pricing';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
export function App() {
  return <div className="flex flex-col min-h-screen bg-[#FFF6F1]">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Problem />
        <Solution />
        <Market />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>;
}