import React from 'react';
import kometLogo from '../komet.png';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="flying-icon" style={{ left: '15%', top: '50%', animationDelay: '0s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/></svg>
      </div>
      <div className="flying-icon" style={{ left: '18%', top: '45%', animationDelay: '1.5s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z'/><path d='M8 14s1.5 2 4 2 4-2 4-2'/><path d='M9 9h.01'/><path d='M15 9h.01'/></svg>
      </div>
      <div className="flying-icon" style={{ left: '12%', top: '55%', animationDelay: '3s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'/></svg>
      </div>
      <div className="flying-icon" style={{ left: '20%', top: '40%', animationDelay: '4.5s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M14.828 14.828a4 4 0 0 1-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z'/></svg>
      </div>
      <div className="flying-icon" style={{ left: '16%', top: '60%', animationDelay: '6s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M9 12l2 2 4-4'/><path d='M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z'/><path d='M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z'/><path d='M12 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z'/><path d='M12 21c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z'/></svg>
      </div>

      <div className="flying-icon right" style={{ right: '5%', top: '10%', animationDelay: '0.5s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/></svg>
      </div>
      <div className="flying-icon right" style={{ right: '8%', top: '30%', animationDelay: '2s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z'/><path d='M8 14s1.5 2 4 2 4-2 4-2'/><path d='M9 9h.01'/><path d='M15 9h.01'/></svg>
      </div>
      <div className="flying-icon right" style={{ right: '3%', top: '50%', animationDelay: '3.5s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'/></svg>
      </div>
      <div className="flying-icon right" style={{ right: '10%', top: '70%', animationDelay: '5s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M14.828 14.828a4 4 0 0 1-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z'/></svg>
      </div>
      <div className="flying-icon right" style={{ right: '6%', top: '90%', animationDelay: '6.5s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M9 12l2 2 4-4'/><path d='M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z'/><path d='M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z'/><path d='M12 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z'/><path d='M12 21c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z'/></svg>
      </div>
      <div className="flying-icon" style={{ left: '22%', top: '35%', animationDelay: '1s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/></svg>
      </div>
      <div className="flying-icon" style={{ left: '14%', top: '65%', animationDelay: '2.5s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3'/></svg>
      </div>
      <div className="flying-icon" style={{ left: '25%', top: '30%', animationDelay: '4s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/><path d='M14 2v6h6'/><path d='M16 13H8'/><path d='M16 17H8'/><path d='M10 9H8'/></svg>
      </div>
      <div className="flying-icon" style={{ left: '19%', top: '70%', animationDelay: '5.5s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M13 2L3 14h9l-1 8 10-12h-9l1-8z'/></svg>
      </div>

      <div className="flying-icon right" style={{ right: '15%', top: '20%', animationDelay: '1.2s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/></svg>
      </div>
      <div className="flying-icon right" style={{ right: '12%', top: '60%', animationDelay: '2.7s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3'/></svg>
      </div>
      <div className="flying-icon right" style={{ right: '20%', top: '80%', animationDelay: '4.2s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/><path d='M14 2v6h6'/><path d='M16 13H8'/><path d='M16 17H8'/><path d='M10 9H8'/></svg>
      </div>
      <div className="flying-icon right" style={{ right: '25%', top: '40%', animationDelay: '5.7s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M13 2L3 14h9l-1 8 10-12h-9l1-8z'/></svg>
      </div>
      <div className="flying-icon" style={{ left: '45%', top: '15%', animationDelay: '0.8s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M9 19c-5 0-7-3-7-7s2-7 7-7 7 3 7 7-2 7-7 7z'/><path d='M15 12l-3-3-3 3'/></svg>
      </div>
      <div className="flying-icon" style={{ right: '45%', top: '15%', animationDelay: '1.8s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M9 19c-5 0-7-3-7-7s2-7 7-7 7 3 7 7-2 7-7 7z'/><path d='M15 12l-3-3-3 3'/></svg>
      </div>
      <div className="flying-icon" style={{ left: '50%', top: '85%', animationDelay: '3.2s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M12 1v6m0 0L9 4m3 3l3-3M12 17v6m0 0l-3-3m3 3l3-3M1 12h6m0 0L4 9m3 3l-3 3M17 12h6m0 0l-3-3m3 3l-3 3'/></svg>
      </div>
      <div className="flying-icon" style={{ right: '50%', top: '85%', animationDelay: '4.8s' }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><path d='M12 1v6m0 0L9 4m3 3l3-3M12 17v6m0 0l-3-3m3 3l3-3M1 12h6m0 0L4 9m3 3l-3 3M17 12h6m0 0l-3-3m3 3l-3 3'/></svg>
      </div>

      <div className="container">
        <div className="hero-content">
          <img src={kometLogo} alt="Komet" className="hero-logo" />
          <h1 className="hero-title">Komet</h1>
          <b className="hero-subtitle">
            Экспериментальный неофициальный клиент MAX, написанный с нуля.
          </b>
        </div>
      </div>
    </section>
  );
};

export default Hero;
