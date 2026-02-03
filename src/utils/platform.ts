export type MobileOS = "android" | "ios" | "other";
export type DesktopOS = "windows" | "linux" | "other";

export function detectMobileOS(): MobileOS {
  if (typeof navigator === "undefined") return "other";
  const ua = (navigator.userAgent || (navigator as any).vendor || (window as any).opera || "").toLowerCase();
  if (ua.includes("android")) return "android";
  if (/(iphone|ipad|ipod)/.test(ua)) return "ios";
  return "other";
}

export function detectDesktopOS(): DesktopOS {
  if (typeof navigator === "undefined") return "other";
  const ua = (navigator.userAgent || "").toLowerCase();
  const platform = (navigator.platform || "").toLowerCase();
  if (ua.includes("windows") || platform.includes("win")) return "windows";
  if (ua.includes("linux") || platform.includes("linux")) return "linux";
  return "other";
}
