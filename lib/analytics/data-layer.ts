export type DataLayerEvent = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

export function pushDataLayerEvent(event: DataLayerEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);
}

function resolveFormName(form: HTMLFormElement) {
  const explicit = form.getAttribute("data-analytics-form");
  if (explicit) return explicit;

  const id = form.getAttribute("id");
  if (id) return id;

  const name = form.getAttribute("name");
  if (name) return name;

  const className = [...form.classList].find((value) => value && value !== "form");
  if (className) return className;

  return "form";
}

export function trackFormSubmit(form: HTMLFormElement) {
  pushDataLayerEvent({
    event: "form_submit",
    form_name: resolveFormName(form),
    form_action: form.getAttribute("action") || undefined,
    form_method: (form.getAttribute("method") || "get").toLowerCase(),
    page_path: window.location.pathname,
    page_location: window.location.href
  });
}
