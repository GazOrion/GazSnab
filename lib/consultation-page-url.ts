export function getConsultationPagePayload() {
  if (typeof window === "undefined") {
    return {};
  }

  return {
    pageUrl: window.location.href,
    pagePath: `${window.location.pathname}${window.location.search}`
  };
}
