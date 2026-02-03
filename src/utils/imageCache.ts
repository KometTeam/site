export async function getCachedImageDataUrl(url: string, maxAgeMs: number): Promise<string> {
  if (typeof window === "undefined") return url;
  try {
    const key = `imgcache:${encodeURIComponent(url)}`;
    const raw = localStorage.getItem(key);
    if (raw) {
      const { ts, dataUrl } = JSON.parse(raw) as { ts: number; dataUrl: string };
      if (Date.now() - ts < maxAgeMs && dataUrl) {
        return dataUrl;
      }
    }

    const res = await fetch(url, { cache: "force-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();

    // Convert to data URL
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    localStorage.setItem(key, JSON.stringify({ ts: Date.now(), dataUrl }));
    return dataUrl;
  } catch (e) {
    // On failure, just return the original URL so the <img> can try to load it
    return url;
  }
}

export function invalidateCachedImage(url: string) {
  try {
    const key = `imgcache:${encodeURIComponent(url)}`;
    localStorage.removeItem(key);
  } catch {}
}
