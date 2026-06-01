import { createServerFn } from "@tanstack/react-start";
import { createHash } from "crypto";

const PIXEL_ID = "D7FT65RC77U0PCJMQSTG";
const ACCESS_TOKEN = "15e9cf6acf5cf37ca3061246679445bea3766d71";

const sha256 = (v?: string) =>
  v ? createHash("sha256").update(v.trim().toLowerCase()).digest("hex") : undefined;

export const sendTikTokEvent = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      event: "CompleteRegistration" | "InitiateCheckout" | "Purchase";
      event_id?: string;
      url?: string;
      user_agent?: string;
      email?: string;
      phone?: string;
      external_id?: string;
      value?: number;
      currency?: string;
      content_id?: string;
      content_name?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    try {
      const payload = {
        event_source: "web",
        event_source_id: PIXEL_ID,
        data: [
          {
            event: data.event,
            event_time: Math.floor(Date.now() / 1000),
            event_id: data.event_id || `${data.event}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            user: {
              email: sha256(data.email),
              phone: sha256(data.phone),
              external_id: sha256(data.external_id),
              user_agent: data.user_agent,
            },
            page: { url: data.url },
            properties:
              data.value !== undefined
                ? {
                    value: data.value,
                    currency: data.currency || "BRL",
                    contents: data.content_id
                      ? [{ content_id: data.content_id, content_name: data.content_name }]
                      : undefined,
                  }
                : undefined,
          },
        ],
      };

      const res = await fetch("https://business-api.tiktok.com/open_api/v1.3/event/track/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Token": ACCESS_TOKEN,
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || (json && json.code && json.code !== 0)) {
        console.error("TikTok Events API error:", res.status, json);
        return { ok: false as const, error: json?.message || `HTTP ${res.status}` };
      }
      return { ok: true as const };
    } catch (e) {
      console.error("TikTok Events API exception:", e);
      return { ok: false as const, error: "request_failed" };
    }
  });
