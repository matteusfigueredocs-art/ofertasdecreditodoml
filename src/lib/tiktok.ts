import { sendTikTokEvent } from "./tiktok.functions";

type EventName = "CompleteRegistration" | "InitiateCheckout" | "Purchase";

export function trackTikTok(
  event: EventName,
  opts: {
    value?: number;
    currency?: string;
    content_id?: string;
    content_name?: string;
    email?: string;
    phone?: string;
    external_id?: string;
  } = {},
) {
  if (typeof window === "undefined") return;
  const event_id = `${event}-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  // Pixel (browser)
  try {
    const ttq = (window as any).ttq;
    if (ttq && typeof ttq.track === "function") {
      const props: any = {};
      if (opts.value !== undefined) {
        props.value = opts.value;
        props.currency = opts.currency || "BRL";
      }
      if (opts.content_id) {
        props.contents = [
          { content_id: opts.content_id, content_name: opts.content_name, quantity: 1, price: opts.value },
        ];
      }
      ttq.track(event, props, { event_id });
    }
  } catch (e) {
    console.warn("ttq.track failed", e);
  }

  // Events API (server-side, deduped by event_id)
  sendTikTokEvent({
    data: {
      event,
      event_id,
      url: window.location.href,
      user_agent: navigator.userAgent,
      email: opts.email,
      phone: opts.phone,
      external_id: opts.external_id,
      value: opts.value,
      currency: opts.currency,
      content_id: opts.content_id,
      content_name: opts.content_name,
    },
  }).catch((e) => console.warn("TikTok server event failed", e));
}
