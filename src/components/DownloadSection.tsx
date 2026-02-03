import React, { useEffect, useState, useRef } from "react";
import { VERSIONS, DOWNLOAD_URLS } from "../constants/downloads";
import { detectMobileOS, detectDesktopOS, type MobileOS, type DesktopOS } from "../utils/platform";

// Minimal icon components reused locally
const Smartphone = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width ?? 24} height={props.height ?? 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);

const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width ?? 24} height={props.height ?? 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

const Monitor = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width ?? 24} height={props.height ?? 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <line x1="8" x2="16" y1="21" y2="21" />
    <line x1="12" x2="12" y1="17" y2="21" />
  </svg>
);

export const DownloadSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileOS, setMobileOS] = useState<MobileOS>("other");
  const [desktopOS, setDesktopOS] = useState<DesktopOS>("other");
  const downloadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    setMobileOS(detectMobileOS());
    setDesktopOS(detectDesktopOS());
  }, []);

  const mobileTitle = mobileOS === "android" ? "Android" : mobileOS === "ios" ? "iOS" : "Android & iOS";
  const mobileHref = mobileOS === "android" ? DOWNLOAD_URLS.ANDROID_APK : mobileOS === "ios" ? DOWNLOAD_URLS.IOS_IPA : DOWNLOAD_URLS.ANDROID_APK;
  const mobileCta = mobileOS === "android" ? "Скачать APK" : mobileOS === "ios" ? "Скачать IPA" : "Скачать APK";

  const desktopTitle = desktopOS === "windows" ? "Windows" : desktopOS === "linux" ? "Linux" : "Windows & Linux";
  const desktopHref = desktopOS === "windows" ? DOWNLOAD_URLS.WINDOWS : desktopOS === "linux" ? DOWNLOAD_URLS.LINUX : DOWNLOAD_URLS.WINDOWS;
  const desktopCta = desktopOS === "windows" ? "Скачать для Windows" : desktopOS === "linux" ? "Скачать для Linux" : "Скачать для Windows";

  return (
    <section
      id="download"
      className={`py-12 sm:py-16 lg:py-24 relative overflow-hidden smooth-scroll ${isLoaded ? "animate-fade-in" : "opacity-0"}`}
      ref={downloadRef}
      tabIndex={-1}
      role="region"
      aria-label="Скачать"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 lg:mb-16">Готовы начать?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {/* Mobile (Android / iOS) */}
          <div className="glass-panel p-5 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl flex flex-col items-center transition-all duration-300 group hover:bg-white/5 hover:border-white/20 hover:-translate-y-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/5 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 text-white transition-colors group-hover:bg-white group-hover:text-black">
              <Smartphone className="sm:hidden" />
              <Smartphone className="hidden sm:block" width={28} height={28} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">{mobileTitle}</h3>
            <p className="text-gray-500 mb-4 sm:mb-5 lg:mb-6 text-sm">Версия {VERSIONS.mobile}</p>
            <a
              href={mobileHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 rounded-xl bg-white/10 hover:bg-white hover:text-black font-semibold transition-all active:scale-98"
            >
              {mobileCta}
            </a>
          </div>

          {/* Telegram */}
          <div className="glass-panel p-5 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl flex flex-col items-center border-indigo-500/30 hover:border-indigo-500/60 shadow-[0_0_50px_rgba(79,70,229,0.1)] hover:shadow-[0_0_70px_rgba(79,70,229,0.2)] transition-all transform hover:-translate-y-1 relative z-10">
            <div className="absolute -top-3 bg-indigo-500 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 rounded-full">РЕКОМЕНДУЕМ</div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-indigo-500 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 text-white shadow-lg shadow-indigo-500/40 transition-transform group-hover:scale-110">
              <DownloadIcon className="sm:hidden" />
              <DownloadIcon className="hidden sm:block" width={28} height={28} />
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

          {/* Desktop */}
          <div className="glass-panel p-5 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl flex flex-col items-center transition-all duration-300 group hover:bg-white/5 hover:border-white/20 hover:-translate-y-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/5 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 text-white transition-colors">
              <Monitor className="sm:hidden" />
              <Monitor className="hidden sm:block" width={28} height={28} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Desktop</h3>
            <p className="text-gray-500 mb-4 sm:mb-5 lg:mb-6 text-sm">{desktopTitle} · Версия {VERSIONS.desktop}</p>
            <a
              href={desktopHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 rounded-xl bg-white/10 hover:bg-white hover:text-black font-semibold transition-all active:scale-98"
            >
              {desktopCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
