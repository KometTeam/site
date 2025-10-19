import React from 'react';

const Header: React.FC = () => {
  

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div></div>
          <nav className="nav">
            <a href="#team" className="nav-link">Команда</a>
            <a href="#features" className="nav-link">Функции</a>
            <a href="#download" className="nav-link download-btn">Скачать</a>
          </nav>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
