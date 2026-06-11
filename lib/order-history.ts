const STORAGE_KEY = "gazsnab_order_tracks";
const MAX_STORED = 50;

export function getStoredTrackNumbers(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((track) => typeof track === "string") : [];
  } catch {
    return [];
  }
}

export function rememberTrackNumber(trackNumber: string) {
  const tracks = getStoredTrackNumbers().filter((stored) => stored !== trackNumber);
  tracks.unshift(trackNumber);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tracks.slice(0, MAX_STORED)));
}
