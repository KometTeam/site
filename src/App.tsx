import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Team from './components/Team';
import Download from './components/Download';
import Footer from './components/Footer';

export function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <div className="app">

      <Header />
      <Hero />
      <Features />
      <Team />
      <Download />
      <Footer />
    </div>
  );
}

export default App;