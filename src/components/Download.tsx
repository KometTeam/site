import React from 'react';
import rustoreIcon from '../rustore.svg';

const Download: React.FC = () => {
  return (
    <section id="download" className="download">
      <div className="container">
        <h2 className="section-title">Скачайте</h2>
        
        <div className="download-options">
          <div className="download-card">
            <div className="download-icon">
              <img src={rustoreIcon} alt="RuStore" style={{ width: '128px', height: '128px' }} />
            </div>
            <h3>Скачать в RuStore</h3>
            <button className="download-btn secondary" disabled>Скоро</button>
          </div>

          <div className="download-card">
            <div className="download-icon">
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' strokeWidth='2' style={{ width: '128px', height: '128px' }}>
                <polygon points='8,5 8,19 19,12' strokeLinejoin='round' strokeLinecap='round'/>
              </svg>
            </div>
            <h3>Скачать в Google Play</h3>
            <button className="download-btn secondary" disabled>Скоро</button>
          </div>

          <div className="download-card">
            <div className="download-icon">
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' strokeWidth='2' style={{ width: '128px', height: '128px' }}>
                <path d='M22 2L11 13' strokeLinecap='round' strokeLinejoin='round'/>
                <path d='M22 2L15 22L11 13L2 9L22 2Z' strokeLinecap='round' strokeLinejoin='round'/>
              </svg>
            </div>
            <h3>Скачать в ТГК</h3>
            <button className="download-btn primary" onClick={() => window.open('https://t.me/TeamKomet', '_blank')}>Открыть канал</button>
          </div>
        </div>

        <div className="download-decoration">
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' fill='none' stroke='black' strokeWidth='2' className="decoration-svg">
            <path d='M20,180 L180,20 L200,40 L40,200 Z'/>
            <path d='M40,160 L160,40 L180,60 L60,180 Z'/>
            <path d='M60,140 L140,60 L160,80 L80,160 Z'/>
          </svg>
        </div>

        <div className="download-decoration-left">
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150' fill='none' stroke='black' strokeWidth='1.5' className="decoration-svg-left">
            <path d='M10,140 L140,10 L150,20 L20,150 Z'/>
            <path d='M30,120 L120,30 L130,40 L40,130 Z'/>
            <path d='M50,100 L100,50 L110,60 L60,110 Z'/>
          </svg>
        </div>

        <div className="download-decoration-top">
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none' stroke='black' strokeWidth='1' className="decoration-svg-top">
            <path d='M5,95 L95,5 L100,10 L10,100 Z'/>
            <path d='M15,85 L85,15 L90,20 L20,90 Z'/>
            <path d='M25,75 L75,25 L80,30 L30,80 Z'/>
          </svg>
        </div>

        <div className="download-decoration-bottom">
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120' fill='none' stroke='black' strokeWidth='1.2' className="decoration-svg-bottom">
            <path d='M8,112 L112,8 L120,16 L16,120 Z'/>
            <path d='M20,100 L100,20 L108,28 L28,108 Z'/>
            <path d='M32,88 L88,32 L96,40 L40,96 Z'/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Download;
