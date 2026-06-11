const TRACK_PREFIX = "GS-";
const TRACK_BODY = /^[A-HJ-NP-Z2-9]{8}$/;

export function generateTrackNumber(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  let body = "";
  for (let i = 0; i < 8; i += 1) {
    body += alphabet[bytes[i] % alphabet.length];
  }
  return `${TRACK_PREFIX}${body}`;
}

export function normalizeTrackNumber(raw: string): string | null {
  const compact = raw.trim().toUpperCase().replace(/\s+/g, "");
  if (!compact) return null;

  const body = compact.startsWith(TRACK_PREFIX) ? compact.slice(TRACK_PREFIX.length) : compact;
  if (!TRACK_BODY.test(body)) return null;

  return `${TRACK_PREFIX}${body}`;
}
