import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import settingsOne from '../screens/settings_one.png';
import settingsTwo from '../screens/settings_two.png';
import settingsThree from '../screens/settings_three.png';
import settingsFour from '../screens/settings_four.png';
import winIcon from '../win.svg';
import linuxIcon from '../linux.svg';
import appleIcon from '../apple.svg';
import androidIcon from '../android.svg';

const Features: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentFunctionScreen, setCurrentFunctionScreen] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentSecurityImage, setCurrentSecurityImage] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [overlayMounted, setOverlayMounted] = useState(false);
  const [overlayShown, setOverlayShown] = useState(false);
  const platformLogos = [winIcon, linuxIcon, appleIcon, androidIcon];
  const [platformIndex, setPlatformIndex] = useState(0);
  const [platformVisible, setPlatformVisible] = useState(true);

  const triggerOverlay = () => {
    const fadeDurationMs = 450;
    const holdMs = 900;
    setOverlayMounted(true);
    requestAnimationFrame(() => setOverlayShown(true));
    window.setTimeout(() => setOverlayShown(false), fadeDurationMs + holdMs);
    window.setTimeout(() => setOverlayMounted(false), fadeDurationMs * 2 + holdMs);
  };
  
  const pages = [
    {
      title: "Настройки безопасности",
      type: "multiple",
      images: [settingsTwo, settingsThree, settingsFour]
    }
  ];

  const functionScreens = [
    {
      title: "Множество настроек",
      description: "Большое количество настроек, которые помогут вам настроить клиент и обезопасить себя!"
    },
    {
      title: "Безопасность",
      description: "Наш клиент не отсылает ваши данные на сервера VK!<br/>Защитите свои данные с помощью современных методов шифрования и приватности.",
      images: [settingsTwo, settingsThree]
    },
    {
      title: "Кроссплатформенность",
      description: "Используйте клиент на любой платформе: Windows, Linux, macOS, Android, iOS",
      platforms: [
        { 
          name: "Windows", 
          icon: (
            <img src={winIcon} alt="Windows" width="32" height="32" />
          )
        },
        { 
          name: "Linux", 
          icon: (
            <img src={linuxIcon} alt="Linux" width="32" height="32" />
          )
        },
        { 
          name: "macOS", 
          icon: (
            <img src={appleIcon} alt="macOS" width="32" height="32" />
          )
        },
        { 
          name: "Android", 
          icon: (
            <img src={androidIcon} alt="Android" width="32" height="32" />
          )
        },
        { 
          name: "iOS", 
          icon: (
            <img src={appleIcon} alt="iOS" width="32" height="32" />
          )
        }
      ]
    }
  ];

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pages.length);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % 3);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + 3) % 3);
  };

  const nextFunctionScreen = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentFunctionScreen((prev) => (prev + 1) % functionScreens.length);
      setIsTransitioning(false);
    }, 250);
  };

  const prevFunctionScreen = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentFunctionScreen((prev) => (prev - 1 + functionScreens.length) % functionScreens.length);
      setIsTransitioning(false);
    }, 250);
  };

  const handleFunctionScreenChange = (index: number) => {
    if (index !== currentFunctionScreen) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentFunctionScreen(index);
        setIsTransitioning(false);
      }, 250);
    }
  };

  const nextSecurityImage = () => {
    setCurrentSecurityImage((prev) => (prev + 1) % 2);
  };

  const prevSecurityImage = () => {
    setCurrentSecurityImage((prev) => (prev - 1 + 2) % 2);
  };

  const handleWhiteWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.nativeEvent && (e.nativeEvent as WheelEvent).cancelable) {
      (e.nativeEvent as WheelEvent).preventDefault();
    }
    if (currentFunctionScreen === 1) {
      if (e.deltaY > 0) {
        nextSecurityImage();
      } else if (e.deltaY < 0) {
        prevSecurityImage();
      }
    } else if (currentFunctionScreen !== 2) {
      if (currentPage === 0) {
        if (e.deltaY > 0) {
          nextImage();
        } else if (e.deltaY < 0) {
          prevImage();
        }
      }
    }
  };

  React.useEffect(() => {
    let intervalId: number | null = null;
    let fadeTimeout: number | null = null;
    if (currentFunctionScreen === 2) {
      intervalId = window.setInterval(() => {
        setPlatformVisible(false);
        fadeTimeout = window.setTimeout(() => {
          setPlatformIndex((prev) => (prev + 1) % platformLogos.length);
          setPlatformVisible(true);
        }, 180);
      }, 1600);
    }
    return () => {
      if (intervalId) window.clearInterval(intervalId);
      if (fadeTimeout) window.clearTimeout(fadeTimeout);
    };
  }, [currentFunctionScreen]);

  return (
    <section id="features" className="features">
      <div className="container">
        <div className="features-layout">
          <div className="features-left">
            <div className={`features-content ${isTransitioning ? 'transitioning' : ''}`}>
              <h2 className="features-title">{functionScreens[currentFunctionScreen].title}</h2>
              <p className="features-description" dangerouslySetInnerHTML={{ __html: functionScreens[currentFunctionScreen].description }}>
              </p>              
            </div>
            <div className="features-indicators">
              {functionScreens.map((_, index) => (
                <div 
                  key={index}
                  className={`indicator ${index === currentFunctionScreen ? 'active' : ''}`}
                  onClick={() => handleFunctionScreenChange(index)}
                ></div>
              ))}
            </div>
          </div>

          
          <div className="empty-space-button">
            <button className="floating-btn" title="Больше настроек" onClick={triggerOverlay}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>
          </div>

          <div className="features-right">
            {currentFunctionScreen === 2 ? (
              <div className="white-screen-plain" onWheel={handleWhiteWheel}>
                <div className="platform-logo-holder">
                  <img
                    key={platformIndex}
                    src={platformLogos[platformIndex]}
                    alt="platform"
                    className={`platform-logo-fader ${platformVisible ? 'show' : ''}`}
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            ) : (
              <div className="white-screen" onWheel={handleWhiteWheel}>
                <h3 className="white-screen-title">{functionScreens[currentFunctionScreen].title}</h3>
                {currentFunctionScreen === 1 && (
                  <div className="white-screen-additional-text">
                    <div className="security-images-stack">
                      <div className="security-images-container">
                      {[settingsTwo, settingsThree].map((image, index) => {
                        console.log(`Security image ${index}:`, image);
                        const isActive = index === currentSecurityImage;
                        const isNext = index === (currentSecurityImage + 1) % 2;
                        const isPrev = index === (currentSecurityImage - 1 + 2) % 2;
                        
                        let style: React.CSSProperties = {};
                        
                        if (isActive) {
                          style = {
                            zIndex: 10,
                            transform: 'translateX(0) rotate(0deg)',
                            opacity: 1
                          };
                        } else if (isNext) {
                          style = {
                            zIndex: 5,
                            transform: 'translateX(20px) rotate(5deg)',
                            opacity: 0.7
                          };
                        } else if (isPrev) {
                          style = {
                            zIndex: 5,
                            transform: 'translateX(-20px) rotate(-5deg)',
                            opacity: 0.7
                          };
                        }
                        
                        return (
                          <img 
                            key={index}
                            src={image} 
                            alt={`Настройки безопасности ${index + 1}`} 
                            className="security-image-card" 
                            style={style}
                          />
                        );
                      })}
                      </div>
                    </div>
                  </div>
                )}
              {currentFunctionScreen !== 1 && currentFunctionScreen !== 2 && (
                <div className="carousel-container" ref={carouselRef}>
                  <div className="carousel-track" style={{ transform: `translateX(-${currentPage * 100}%)` }}>
                    {pages.map((page, pageIndex) => (
                      <div key={pageIndex} className="carousel-slide">
                        {page.type === "single" ? (
                          <div className="single-image-container">
                            <img src={page.image} alt={page.title} className="settings-image single" />
                          </div>
                        ) : (
                          <div className="multiple-images">
                            {page.images.map((image, imgIndex) => {
                              const isActive = imgIndex === currentImageIndex;
                              const isAbove = imgIndex > currentImageIndex;
                              const isBelow = imgIndex < currentImageIndex;
                              
                              let style: React.CSSProperties = {};
                              
                              if (isActive) {
                                style = {
                                  zIndex: 10,
                                  transform: 'translateY(0) rotate(0deg)',
                                  opacity: 1
                                };
                              } else if (isAbove) {
                                const offset = (imgIndex - currentImageIndex) * 20;
                                const rotation = (imgIndex - currentImageIndex) * 5;
                                style = {
                                  zIndex: 5 - (imgIndex - currentImageIndex),
                                  transform: `translateY(-${offset}px) rotate(${rotation}deg)`,
                                  opacity: Math.max(0.3, 1 - (imgIndex - currentImageIndex) * 0.2)
                                };
                              } else if (isBelow) {
                                const offset = (currentImageIndex - imgIndex) * 20;
                                const rotation = (currentImageIndex - imgIndex) * -5;
                                style = {
                                  zIndex: 5 - (currentImageIndex - imgIndex),
                                  transform: `translateY(${offset}px) rotate(${rotation}deg)`,
                                  opacity: Math.max(0.3, 1 - (currentImageIndex - imgIndex) * 0.2)
                                };
                              }
                              
                              return (
                                <img 
                                  key={imgIndex} 
                                  src={image} 
                                  alt={`Настройка ${imgIndex + 1}`} 
                                  className="settings-image multiple" 
                                  style={style}
                                />
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {currentFunctionScreen !== 1 && (
                <div className="image-indicators">
                  {currentPage === 0 ? (
                    pages.map((_, index) => (
                      <button
                        key={index}
                        className={`indicator ${index === currentPage ? 'active' : ''}`}
                        onClick={() => setCurrentPage(index)}
                      />
                    ))
                  ) : (
                    pages[0].images.map((_, index) => (
                      <button
                        key={index}
                        className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))
                  )}
                </div>
              )}
              </div>
            )}
        </div>
        {overlayMounted ? createPortal(
          (
            <div 
              className={`overlay ${overlayShown ? 'show' : ''}`}
              onClick={() => {
                setOverlayShown(false);
                window.setTimeout(() => setOverlayMounted(false), 300);
              }}
            >
              <div className="overlay-message">В разработке</div>
            </div>
          ),
          document.body
        ) : null}
        </div>
      </div>
    </section>
  );
};

export default Features;