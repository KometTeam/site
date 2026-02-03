import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import DownloadSection from './components/DownloadSection';

// Статические импорты ассетов (нихуя не работают)
import klockyAvatar from './pfps/klocky.png';
import floppyAvatar from './pfps/floppy.png';
import nxznAvatar from './pfps/nxzn.png';
import mixottAvatar from './pfps/mixott.png';
import inkAvatar from './pfps/ink.png';
import kilobyteAvatar from './pfps/kilobyte.png';
import jganenokAvatar from './pfps/jganenok.png';

// --- КОНСТАНТЫ ---
const INTERSECTION_THRESHOLD = 0.1;
const ANIMATION_BASE_DELAY = 100;
const SCROLL_THRESHOLD = 20;

const AVATAR_COLORS = [
    'from-purple-500 to-indigo-600',
    'from-indigo-500 to-blue-600',
    'from-blue-500 to-cyan-600',
    'from-teal-500 to-emerald-600',
    'from-rose-500 to-pink-600',
    'from-orange-500 to-amber-600',
    'from-cyan-500 to-sky-600'
] as const;

// --- ТИПЫ ---
type IconProps = React.SVGProps<SVGSVGElement> & {
    size?: number;
    className?: string;
};

type IconComponentProps = Omit<IconProps, 'children'>;

// --- ИКОНКИ (Inline для избежания зависимости от lucide-react) ---
const Icon = ({ size = 24, className = "", children, ...props }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
    >
        {children}
    </svg>
);

const Shield = (props: IconComponentProps) => <Icon {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></Icon>;
const Zap = (props: IconComponentProps) => <Icon {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></Icon>;
const Lock = (props: IconComponentProps) => <Icon {...props}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></Icon>;
const Palette = (props: IconComponentProps) => <Icon {...props}><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></Icon>;
const Monitor = (props: IconComponentProps) => <Icon {...props}><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></Icon>;
const Globe = (props: IconComponentProps) => <Icon {...props}><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></Icon>;
const Smartphone = (props: IconComponentProps) => <Icon {...props}><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></Icon>;
const Download = (props: IconComponentProps) => <Icon {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></Icon>;
const Menu = (props: IconComponentProps) => <Icon {...props}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></Icon>;
const X = (props: IconComponentProps) => <Icon {...props}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Icon>;
const Github = (props: IconComponentProps) => <Icon {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></Icon>;
const ChevronDown = (props: IconComponentProps) => <Icon {...props}><path d="m6 9 6 6 6-6" /></Icon>;

// --- LAZY LOADED AVATAR COMPONENT ---
interface LazyAvatarProps {
    src: string;
    alt: string;
    name: string;
}

const LazyAvatar = ({ src, alt, name }: LazyAvatarProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry?.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: INTERSECTION_THRESHOLD, rootMargin: '100px' }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const getInitials = useCallback((nameStr: string) => {
        return nameStr.charAt(0).toUpperCase();
    }, []);

    const colorIndex = useMemo(() => {
        return name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % AVATAR_COLORS.length;
    }, [name]);

    if (!isInView) {
        return (
            <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-800 animate-pulse mb-4 sm:mb-6 flex-shrink-0"
                role="img"
                aria-label={`Загрузка аватара ${name}`}
            />
        );
    }

    return (
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4 sm:mb-6 flex-shrink-0 relative group">
            {/* Loading skeleton - показывается только пока изображение загружается */}
            {!isLoaded && !hasError && (
                <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${AVATAR_COLORS[colorIndex]} flex items-center justify-center text-2xl sm:text-3xl font-bold text-white transition-opacity duration-300 z-10`}
                >
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
            )}

            {/* Основное изображение */}
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                className={`w-full h-full rounded-full object-cover transition-all duration-500 ${
                    isLoaded ? 'opacity-100 scale-100' : 'opacity-0'
                }`}
                onLoad={() => {
                    setIsLoaded(true);
                    setHasError(false);
                }}
                onError={() => {
                    setHasError(true);
                    setIsLoaded(false);
                }}
                loading="lazy"
            />

            {/* Error fallback - инициалы (перекрываються анимацией бля) */}
            {hasError && (
                <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${AVATAR_COLORS[colorIndex]} flex items-center justify-center text-2xl sm:text-3xl font-bold text-white shadow-xl group-hover:scale-110 transition-transform z-20`}
                    role="img"
                    aria-label={`Аватар ${name}`}
                >
                    {getInitials(name)}
                </div>
            )}

            {/* Тонкое кольцо */}
            <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300" />
        </div>
    );
};

// хуйня пилик пилик. тут типо анимации.
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

    :root {
      --font-inter: 'Inter', sans-serif;
    }

    body {
      font-family: var(--font-inter);
      background-color: #050505;
      color: #ffffff;
      overflow-x: hidden;
    }

    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #0a0a0a;
    }
    ::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    @keyframes float-slow {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(2deg); }
    }
    
    @keyframes float-medium {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      33% { transform: translateY(-15px) translateX(10px); }
      66% { transform: translateY(10px) translateX(-5px); }
    }

    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.05); }
      50% { box-shadow: 0 0 40px rgba(255,255,255,0.15); }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
    .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
    .animate-pulse-glow { animation: pulse-glow 4s infinite; }
    .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
    .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
    .animate-scale-in { animation: scaleIn 0.5s ease-out forwards; }

    .text-gradient {
      background: linear-gradient(135deg, #fff 0%, #a5a5a5 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .text-gradient-accent {
      background: linear-gradient(135deg, #fff 30%, #6366f1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .glass-panel {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .glass-header {
      background: rgba(5, 5, 5, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      animation: marquee 30s linear infinite;
    }

    .smooth-scroll {
      scroll-behavior: smooth;
    }

    * {
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
    }

    a:focus-visible,
    button:focus-visible {
      outline: 2px solid #6366f1;
      outline-offset: 2px;
    }

    img {
      image-rendering: -webkit-optimize-contrast;
    }

    /* Hide scrollbar for horizontal scrolling */
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

// шапка
const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
        window.addEventListener('scroll', handleScroll, { passive: true });

        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const navLinks = [
        { name: 'Функции', href: '#features' },
        { name: 'Команда', href: '#team' },
        { name: 'FAQ', href: '#faq' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'glass-header py-4' : 'bg-transparent py-6'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                <a href="#" className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-white to-gray-400 flex items-center justify-center shadow-lg group-hover:shadow-white/20 transition-all duration-300 group-hover:scale-105 active:scale-95">
                        <span className="text-black font-bold text-lg sm:text-xl">G</span>
                    </div>
                    <span className="text-lg sm:text-xl font-bold tracking-tight text-white">Gomet</span>
                </a>

                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, index) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-400 hover:text-white transition-all duration-300 relative group"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                    <a
                        href="#download"
                        className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                    >
                        Скачать
                    </a>
                </nav>

                <button
                    className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors active:scale-95 z-50 relative"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Попытка адапатации под мобилы  */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* пытка дергать судьбу за нитки. адаптация менюшки под мобилу */}
            <div
                className={`absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 p-4 md:hidden flex flex-col gap-2 animate-fade-in-up transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}
                style={{ zIndex: 45 }}
                role="navigation"
                aria-label="Мобильное меню"
            >
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-base sm:text-lg font-medium text-gray-300 hover:text-white transition-colors py-3 px-4 rounded-xl hover:bg-white/5"
                    >
                        {link.name}
                    </a>
                ))}
                <a
                    href="#download"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3.5 rounded-xl bg-white text-black font-bold mt-2 active:scale-98 transition-transform"
                >
                    Скачать
                </a>
            </div>
        </header>
    );
};

// Основа основ
const Hero = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const icons = useMemo(() =>
        Array.from({ length: 6 }, (_, i) => ({
            id: i,
            top: Math.random() * 80 + 10,
            left: Math.random() * 80 + 10,
            delay: i * 1.5,
            type: i % 3
        })), []
    );

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        setMousePos({ x, y });
    }, []);

    return (
        <section
            className={`relative min-h-screen flex items-center justify-center pt-20 overflow-hidden smooth-scroll ${
                isLoaded ? 'animate-fade-in' : ''
            }`}
            onMouseMove={handleMouseMove}
            role="region"
            aria-label="Главный экран"
        >
            {/* Background glow effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-indigo-500/20 rounded-full blur-[100px] sm:blur-[120px] mix-blend-screen animate-pulse-glow" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-[100px] sm:blur-[120px] mix-blend-screen" />
            </div>

            {/* Floating icons - hidden on mobile for better performance */}
            <div className="absolute inset-0 pointer-events-none z-10 hidden sm:block overflow-hidden" aria-hidden="true">
                {icons.map((icon) => (
                    <div
                        key={icon.id}
                        className="absolute opacity-20 text-white animate-float-slow"
                        style={{
                            top: `${icon.top}%`,
                            left: `${icon.left}%`,
                            animationDelay: `${icon.delay}s`,
                            transform: `translate(${mousePos.x * (icon.id + 1) * -1}px, ${mousePos.y * (icon.id + 1) * -1}px)`,
                            transition: 'transform 0.3s ease-out'
                        }}
                    >
                        {icon.type === 0 ? <Shield size={32} /> : icon.type === 1 ? <Zap size={24} /> : <Lock size={28} />}
                    </div>
                ))}
            </div>

            <div className="relative z-20 text-center max-w-4xl mx-auto px-4 sm:px-6">
                <div className={`inline-block mb-4 sm:mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-white/10 ${
                    isLoaded ? 'animate-fade-in-up' : 'opacity-0'
                }`} style={{ animationDelay: '0.1s' }}>
                    <span className="text-xs sm:text-sm font-medium text-indigo-300 uppercase tracking-wider">Неофициальный клиент VK Max</span>
                </div>

                <h1 className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-4 sm:mb-6 text-white leading-tight ${
                    isLoaded ? 'animate-fade-in-up' : 'opacity-0'
                }`} style={{ animationDelay: '0.2s' }}>
                    Новый взгляд <br /> на <span className="text-gradient-accent">привычное</span>
                </h1>

                <p className={`text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed ${
                    isLoaded ? 'animate-fade-in-up' : 'opacity-0'
                }`} style={{ animationDelay: '0.3s' }}>
                    Gomet - это экспериментальный клиент с упором на приватность.
                    Полностью написан с нуля для вас.
                </p>

                <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 ${
                    isLoaded ? 'animate-fade-in-up' : 'opacity-0'
                }`} style={{ animationDelay: '0.4s' }}>
                    <a
                        href="#download"
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full font-bold text-sm sm:text-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95"
                    >
                        Скачать сейчас
                    </a>
                    <a
                        href="#features"
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/5 text-white border border-white/10 rounded-full font-bold text-sm sm:text-lg hover:bg-white/10 transition-all backdrop-blur-md active:scale-95"
                    >
                        Узнать больше
                    </a>
                </div>
            </div>
        </section>
    );
};

// разд фич
const Features = () => {
    const [activeFeature, setActiveFeature] = useState(0);
    const featuresRef = useRef<HTMLDivElement>(null);

    const features = useMemo(() => [
        {
            title: "Тотальная Приватность",
            desc: "Наш клиент не отсылает ваши данные на сервера аналитики. опциональный прокси",
            icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />,
            color: "from-green-500/20 to-emerald-500/5",
            mockupContent: (
                <div className="w-full h-full p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
                    <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 transition-all hover:bg-white/10">
                        <span className="text-xs sm:text-sm font-medium">Шифрование БД</span>
                        <div className="w-8 h-5 sm:w-10 sm:h-6 bg-green-500 rounded-full relative"><div className="absolute right-0.5 top-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"/></div>
                    </div>
                    <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 transition-all hover:bg-white/10">
                        <span className="text-xs sm:text-sm font-medium">Скрыть «Набирает...»</span>
                        <div className="w-8 h-5 sm:w-10 sm:h-6 bg-green-500 rounded-full relative"><div className="absolute right-0.5 top-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"/></div>
                    </div>
                    <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 transition-all hover:bg-white/10">
                        <span className="text-xs sm:text-sm font-medium">Невидимка</span>
                        <div className="w-8 h-5 sm:w-10 sm:h-6 bg-white/20 rounded-full relative"><div className="absolute left-0.5 top-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"/></div>
                    </div>
                    <div className="mt-auto p-3 sm:p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                        <span className="text-xs text-green-400">Система защиты активна</span>
                    </div>
                </div>
            )
        },
        {
            title: "Безграничная Кастомизация",
            desc: "Настройте каждый аспект приложения. Темы, шрифты, акцентные цвета, расположение элементов. Ваш клиент - ваши правила.",
            icon: <Palette className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" />,
            color: "from-pink-500/20 to-rose-500/5",
            mockupContent: (
                <div className="w-full h-full p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1 sm:mb-2">Accent Color</div>
                    <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className={`aspect-square rounded-full cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                                i === 2 ? 'border-2 border-white ring-2 ring-pink-500' : ''
                            }`} style={{ backgroundColor: `hsl(${i * 45}, 70%, 50%)` }} />
                        ))}
                    </div>
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1 sm:mb-2">Interface</div>
                    <div className="space-y-2 sm:space-y-3">
                        <div className="h-10 sm:h-12 w-full bg-white/5 rounded-lg border border-white/10 flex items-center px-3 sm:px-4 gap-2 sm:gap-3 transition-all hover:bg-white/10">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-indigo-500" />
                            <div className="w-16 sm:w-20 h-2 bg-white/20 rounded-full" />
                        </div>
                        <div className="h-10 sm:h-12 w-full bg-white/5 rounded-lg border border-white/10 flex items-center px-3 sm:px-4 gap-2 sm:gap-3 transition-all hover:bg-white/10">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-orange-500" />
                            <div className="w-20 sm:w-24 h-2 bg-white/20 rounded-full" />
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Кроссплатформенность",
            desc: "Работает везде. Windows, macOS, Linux, Android. Единый опыт на всех устройствах с синхронизацией настроек.",
            icon: <Monitor className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />,
            color: "from-blue-500/20 to-cyan-500/5",
            mockupContent: (
                <div className="w-full h-full flex items-center justify-center relative p-4">
                    <div className="absolute inset-0 grid grid-cols-2 gap-2 opacity-30 p-2 sm:p-4">
                        <div className="bg-white/10 rounded-lg" />
                        <div className="bg-white/10 rounded-lg" />
                        <div className="bg-white/10 rounded-lg" />
                        <div className="bg-white/10 rounded-lg" />
                    </div>
                    <div className="relative z-10 text-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/20 backdrop-blur-md shadow-2xl transition-transform hover:scale-110">
                            <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <div className="flex gap-1.5 sm:gap-3 justify-center mt-4 sm:mt-6 flex-wrap px-2">
                            <div className="px-2 sm:px-3 py-1 bg-white/5 rounded text-xs sm:text-sm border border-white/10 transition-all hover:bg-white/10">Win</div>
                            <div className="px-2 sm:px-3 py-1 bg-white/5 rounded text-xs sm:text-sm border border-white/10 transition-all hover:bg-white/10">Mac</div>
                            <div className="px-2 sm:px-3 py-1 bg-white/5 rounded text-xs sm:text-sm border border-white/10 transition-all hover:bg-white/10">Linux</div>
                            <div className="px-2 sm:px-3 py-1 bg-white/5 rounded text-xs sm:text-sm border border-white/10 transition-all hover:bg-white/10">Droid</div>
                        </div>
                    </div>
                </div>
            )
        }
    ], []);

    return (
        <section
            id="features"
            className="py-12 sm:py-16 lg:py-24 relative"
            ref={featuresRef}
            tabIndex={-1}
            role="region"
            aria-label="Функции"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

                {/* попытка сделать телефон (там пару кнопочек отцентрировать надобно) */}
                <div className="sticky top-32 hidden lg:flex justify-center h-[500px] lg:h-[600px] items-center">
                    <div className="relative w-[280px] h-[560px] lg:w-[320px] lg:h-[640px] bg-black border-8 border-gray-800 rounded-[3rem] shadow-2xl overflow-hidden ring-1 ring-white/10 transition-all duration-500">
                        <div className="absolute inset-0 bg-[#111] transition-all duration-500">
                            <div className={`absolute inset-0 bg-gradient-to-b ${features[activeFeature]?.color || ''} transition-all duration-700 opacity-50`}></div>

                            <div className="h-8 w-full flex justify-between px-4 sm:px-6 items-center pt-2">
                                <span className="text-[10px] font-medium text-white/50">12:41</span>
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 bg-white/20 rounded-full" />
                                    <div className="w-3 h-3 bg-white/20 rounded-full" />
                                </div>
                            </div>

                            <div className="p-2 h-[calc(100%-2rem)]">
                                {features[activeFeature]?.mockupContent}
                            </div>

                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-1 bg-white/20 rounded-full" />
                        </div>
                    </div>
                </div>

                <div className="space-y-8 sm:space-y-12 lg:py-20">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group cursor-pointer"
                            onMouseEnter={() => setActiveFeature(index)}
                            onClick={() => setActiveFeature(index)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setActiveFeature(index);
                                }
                            }}
                        >
                            <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 w-fit mb-4 sm:mb-6 transition-all duration-300 border border-white/5 ${
                                index === activeFeature ? 'bg-white/10 scale-105 sm:scale-110' : 'group-hover:bg-white/10 group-hover:scale-100 sm:group-hover:scale-105'
                            }`}>
                                {feature.icon}
                            </div>
                            <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 transition-colors duration-300 ${
                                index === activeFeature ? 'text-white' : 'text-gray-600 group-hover:text-gray-400'
                            }`}>
                                {feature.title}
                            </h3>
                            <p className={`text-sm sm:text-base lg:text-lg leading-relaxed transition-colors duration-300 ${
                                index === activeFeature ? 'text-gray-300' : 'text-gray-700 group-hover:text-gray-500'
                            }`}>
                                {feature.desc}
                            </p>

                            {/* Mobile Mockup - Visible only on mobile */}
                            <div className="lg:hidden mt-6 sm:mt-8 aspect-[4/5] bg-gray-900 rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden relative">
                                <div className={`absolute inset-0 bg-gradient-to-b ${feature.color} opacity-30`}></div>
                                {feature.mockupContent}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// раздел команды список на пиздиловку.
const Team = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsLoaded(true);

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry?.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            },
            { threshold: INTERSECTION_THRESHOLD }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);
    // в этом списске есть все. в нем только нет. меня.... (мем) актуализировать список. думаю подтягивать с страницы команды на гитхабе.
    const teamMembers = useMemo(() => [
        { name: 'Klocky', role: 'Founder & Lead', avatar: klockyAvatar, color: 'bg-purple-500' },
        { name: 'Floppy', role: 'Project Manager', avatar: floppyAvatar, color: 'bg-indigo-500' },
        { name: 'Nxzn', role: 'Web & Client', avatar: nxznAvatar, color: 'bg-blue-500' },
        { name: 'Mixott', role: 'Backend API', avatar: mixottAvatar, color: 'bg-teal-500' },
        { name: 'Ink', role: 'Research', avatar: inkAvatar, color: 'bg-rose-500' },
        { name: 'Kilobyte', role: 'Frontend', avatar: kilobyteAvatar, color: 'bg-orange-500' },
        { name: 'Jganenok', role: 'Fullstack', avatar: jganenokAvatar, color: 'bg-cyan-500' },
    ], []);

    return (
        <section
            id="team"
            className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-black to-[#050505] smooth-scroll"
            ref={sectionRef}
            tabIndex={-1}
            role="region"
            aria-label="Команда"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-500 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    Команда <span className="text-gray-500">Gomet</span>
                </h2>

                {/* короче типа пиздатый дизайн карточек участинков команды. */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap lg:justify-center gap-3 sm:gap-4 lg:gap-6 px-2 sm:px-0">
                    {teamMembers.map((member, index) => (
                        <div
                            key={member.name}
                            className={`glass-panel p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl flex flex-col items-center transition-all duration-500 group hover:bg-white/5 hover:-translate-y-1 lg:hover:-translate-y-2 hover:shadow-xl cursor-pointer ${
                                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                            style={{ animationDelay: `${index * ANIMATION_BASE_DELAY}ms` }}
                        >
                            <LazyAvatar
                                src={member.avatar}
                                alt={`${member.name} avatar`}
                                name={member.name}
                            />
                            <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-1 text-white group-hover:text-white transition-colors">{member.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider font-medium group-hover:text-gray-400 transition-colors">{member.role}</p>

                            <div className="mt-3 sm:mt-4 w-full h-1 bg-white/10 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-0 group-hover:w-full transition-all duration-500" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Marquee Banner */}
                <div className="relative h-24 sm:h-32 lg:h-40 overflow-hidden opacity-10 pointer-events-none select-none mt-10 sm:mt-12 lg:mt-16" aria-hidden="true">
                    <div className="absolute inset-0 flex items-center animate-marquee whitespace-nowrap">
                        <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black px-4">БЫСТРЫЙ</span>
                        <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black px-4 text-transparent stroke-white" style={{ WebkitTextStroke: '2px white' }}>БЕЗОПАСНЫЙ</span>
                        <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black px-4">КРАСИВЫЙ</span>
                        <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black px-4 text-transparent stroke-white" style={{ WebkitTextStroke: '2px white' }}>СОВРЕМЕННЫЙ</span>
                        <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black px-4">БЫСТРЫЙ</span>
                        <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black px-4 text-transparent stroke-white" style={{ WebkitTextStroke: '2px white' }}>БЕЗОПАСНЫЙ</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

// FAQ
const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const faqs = useMemo(() => [
        {
            question: "Безопасен ли Gomet?",
            answer: "Gomet - это приватность по умолчанию. Мы не используем внешнюю аналитику и не собираем ваши данные. Однако риски со стороны инфраструктуры MAX сохраняются. Мы уже работаем над внедрением шифрования, чтобы сделать ваше общение в Gomet полностью защищенным."
        },
        {
            question: "На каких платформах работает Gomet?",
            answer: "Gomet поддерживает Windows, macOS, Linux, Android и iOS. Мы стремимся обеспечить единый опыт использования на всех устройствах."
        },
        {
            question: "Как установить Gomet?",
            answer: "Скачайте APK-файл для Android с нашего Telegram-канала или дождитесь выхода в RuStore. Для десктопных версий следуйте инструкциям на странице загрузки."
        },
        {
            question: "Будет ли десктопная версия?",
            answer: "Да, десктопные версии для Windows и Linux находятся в разработке. Следите за обновлениями в нашем Telegram-канале, чтобы не пропустить релиз."
        }
    ], []);

    return (
        <section
            id="faq"
            className={`py-12 sm:py-16 lg:py-24 smooth-scroll ${
                isLoaded ? 'animate-fade-in' : 'opacity-0'
            }`}
            tabIndex={-1}
            role="region"
            aria-label="FAQ"
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16">
                    FAQ
                </h2>

                <div className="space-y-3 sm:space-y-4" role="list">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`glass-panel rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${
                                openIndex === index ? 'bg-white/5 border-white/10' : ''
                            }`}
                        >
                            <button
                                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                aria-expanded={openIndex === index}
                                aria-controls={`faq-answer-${index}`}
                            >
                                <span className="text-sm sm:text-lg font-semibold text-white pr-4">{faq.question}</span>
                                <ChevronDown
                                    size={18}
                                    className={`text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                                        openIndex === index ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            <div
                                id={`faq-answer-${index}`}
                                className={`overflow-hidden transition-all duration-300 ${
                                    openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                                role="listitem"
                            >
                                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-sm sm:text-base text-gray-400 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const DownloadSectionLegacy = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const downloadRef = useRef<HTMLDivElement>(null);
    // Auto-detect desktop OS and prepare download URLs
    const [desktopOS, setDesktopOS] = useState<'windows' | 'linux' | 'other'>('other');
    const WINDOWS_URL = 'https://resources.komet-app.ru/versions/v0.4.1/Komet-Windows';
    const LINUX_URL = 'https://resources.komet-app.ru/versions/v0.4.1/Komet-Linux';
    const ANDROID_URL = 'https://resources.komet-app.ru/versions/v0.4.1/Komet-universal.apk';
    const IOS_URL = 'https://resources.komet-app.ru/versions/v0.4.1/Komet-iOS.ipa';
    const [mobileOS, setMobileOS] = useState<'android' | 'ios' | 'other'>('other');

    useEffect(() => {
        if (typeof navigator === 'undefined') return;
        const uaFull = (navigator.userAgent || (navigator as any).vendor || (window as any).opera || '').toLowerCase();
        const platform = (navigator.platform || '').toLowerCase();

        // Mobile OS detection
        if (uaFull.includes('android')) {
            setMobileOS('android');
        } else if (/(iphone|ipad|ipod)/.test(uaFull)) {
            setMobileOS('ios');
        } else {
            setMobileOS('other');
        }

        // Desktop OS detection
        if (uaFull.includes('windows') || platform.includes('win')) {
            setDesktopOS('windows');
        } else if (uaFull.includes('linux') || platform.includes('linux')) {
            setDesktopOS('linux');
        } else {
            setDesktopOS('other');
        }
    }, []);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <section
            id="download"
            className={`py-12 sm:py-16 lg:py-24 relative overflow-hidden smooth-scroll ${
                isLoaded ? 'animate-fade-in' : 'opacity-0'
            }`}
            ref={downloadRef}
            tabIndex={-1}
            role="region"
            aria-label="Скачать"
        >
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 lg:mb-16">Готовы начать?</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                    <div className="glass-panel p-5 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl flex flex-col items-center transition-all duration-300 group hover:bg-white/5 hover:border-white/20 hover:-translate-y-1">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/5 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 text-white transition-colors group-hover:bg-white group-hover:text-black">
                            <Smartphone size={24} className="sm:hidden" />
                            <Smartphone size={28} className="hidden sm:block" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold mb-2">
                            {mobileOS === 'android' && 'Android'}
                            {mobileOS === 'ios' && 'iOS'}
                            {mobileOS === 'other' && 'Android & iOS'}
                        </h3>
                        <p className="text-gray-500 mb-4 sm:mb-5 lg:mb-6 text-sm">Версия 0.4.1</p>
                        <a
                            href={mobileOS === 'android' ? ANDROID_URL : mobileOS === 'ios' ? IOS_URL : ANDROID_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center py-3 rounded-xl bg-white/10 hover:bg-white hover:text-black font-semibold transition-all active:scale-98"
                        >
                            {mobileOS === 'android' && 'Скачать APK'}
                            {mobileOS === 'ios' && 'Скачать IPA'}
                            {mobileOS === 'other' && 'Скачать APK'}
                        </a>
                    </div>

                    {false && (
                    <div className="glass-panel p-5 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl flex flex-col items-center transition-all duration-300 group hover:bg-white/5 hover:border-white/20 hover:-translate-y-1">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/5 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 text-white transition-colors group-hover:bg-white group-hover:text-black">
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6 sm:w-7 sm:h-7'>
                                <path d='M16.365 1.43c-.99.058-2.162.7-2.86 1.52-.626.732-1.151 1.834-.948 2.915 1.097.083 2.223-.588 2.89-1.415.633-.79 1.122-1.878.918-3.02zM20.44 16.38c-.045-.09-2.058-1.145-2.103-3.416-.02-1.78 1.38-2.634 1.44-2.67-.79-1.156-2.017-1.314-2.457-1.33-1.046-.105-2.05.61-2.582.61-.54 0-1.35-.598-2.275-.58-1.172.018-2.257.682-2.86 1.734-1.22 2.112-.31 5.226.86 6.936.57.825 1.248 1.75 2.147 1.72.86-.035 1.188-.56 2.23-.56 1.023 0 1.33.56 2.254.54.93-.018 1.523-.84 2.09-1.67.64-.944.91-1.87.906-1.9z' />
                            </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold mb-2">iOS</h3>
                        <p className="text-gray-500 mb-4 sm:mb-5 lg:mb-6 text-sm">Версия 0.4.1</p>
                        <a
                            href="https://resources.komet-app.ru/versions/v0.4.1/Komet-iOS.ipa"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center py-3 rounded-xl bg-white/10 hover:bg-white hover:text-black font-semibold transition-all active:scale-98"
                        >
                            Скачать IPA
                        </a>
                    </div>
                    )}

                    {/* типо красиво оформляем*/}
                    <div className="glass-panel p-5 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl flex flex-col items-center border-indigo-500/30 hover:border-indigo-500/60 shadow-[0_0_50px_rgba(79,70,229,0.1)] hover:shadow-[0_0_70px_rgba(79,70,229,0.2)] transition-all transform hover:-translate-y-1 relative z-10">
                        <div className="absolute -top-3 bg-indigo-500 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 rounded-full">
                            РЕКОМЕНДУЕМ
                        </div>
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-indigo-500 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 text-white shadow-lg shadow-indigo-500/40 transition-transform group-hover:scale-110">
                            <Download size={24} className="sm:hidden" />
                            <Download size={28} className="hidden sm:block" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold mb-2">Telegram</h3>
                        <p className="text-gray-400 mb-4 sm:mb-5 lg:mb-6 text-sm">Наш канал обновлений</p>
                        <button
                            onClick={() => window.open('https://t.me/TeamKomet', '_blank', 'noopener,noreferrer')}
                            className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold transition-all shadow-lg shadow-indigo-500/20 active:scale-98"
                        >
                            Перейти в канал
                        </button>
                    </div>

                    {/* Desktop Card */}
                    <div className="glass-panel p-5 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl flex flex-col items-center transition-all duration-300 group hover:bg-white/5 hover:border-white/20 hover:-translate-y-1">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/5 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 text-white transition-colors">
                            <Monitor size={24} className="sm:hidden" />
                            <Monitor size={28} className="hidden sm:block" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold mb-2">Desktop</h3>
                        <p className="text-gray-500 mb-4 sm:mb-5 lg:mb-6 text-sm">
                            {desktopOS === 'windows' && 'Windows'}
                            {desktopOS === 'linux' && 'Linux'}
                            {desktopOS === 'other' && 'Windows & Linux'}
                        </p>
                        <a
                            href={desktopOS === 'windows' ? WINDOWS_URL : desktopOS === 'linux' ? LINUX_URL : WINDOWS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center py-3 rounded-xl bg-white/10 hover:bg-white hover:text-black font-semibold transition-all active:scale-98"
                        >
                            {desktopOS === 'windows' && 'Скачать для Windows'}
                            {desktopOS === 'linux' && 'Скачать для Linux'}
                            {desktopOS === 'other' && 'Скачать для Windows'}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-6 sm:py-10 lg:py-12 border-t border-white/5 bg-black text-center relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Footer Content */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
                    {/* Logo and Description */}
                    <div className="text-center sm:text-left order-2 sm:order-1">
                        <h4 className="font-bold text-lg sm:text-xl text-white mb-2">Komet</h4>
                        <p className="text-gray-500 text-xs sm:text-sm max-w-xs sm:max-w-none">
                            Экспериментальный клиент, если к вам приедет кгб,фсб,цру вас обьявят в розык интерпола мы ни причем.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-3 sm:gap-4 order-1 sm:order-2">
                        <a
                            href="#"
                            className="text-gray-500 hover:text-white transition-colors p-2.5 sm:p-2 rounded-lg hover:bg-white/10"
                            aria-label="GitHub"
                        >
                            <Github size={18} className="sm:hidden" />
                            <Github size={20} className="hidden sm:block" />
                        </a>
                        <a
                            href="#"
                            className="text-gray-500 hover:text-white transition-colors p-2.5 sm:p-2 rounded-lg hover:bg-white/10"
                            aria-label="Website"
                        >
                            <Globe size={18} className="sm:hidden" />
                            <Globe size={20} className="hidden sm:block" />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 sm:mt-8 lg:mt-10 text-gray-600 text-xs sm:text-sm">
                    © {currentYear} TeamGomet - слишком ахуенные для этого мира (сдохнем нахуй от переработок), а ещё клоки пидор.
                </div>
            </div>
        </footer>
    );
};

// типо главный клас типо запускает сайт.
export function App() {
    return (
        <div className="bg-black min-h-screen text-white selection:bg-indigo-500 selection:text-white">
            <GlobalStyles />
            <Header />
            <main className="smooth-scroll">
                <Hero />
                <Features />
                <Team />
                <FAQ />
                <DownloadSection />
            </main>
            <Footer />
        </div>
    );
}
