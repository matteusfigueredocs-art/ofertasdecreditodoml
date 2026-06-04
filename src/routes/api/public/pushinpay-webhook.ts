import { createFileRoute } from "@tanstack/react-router";

const WEBHOOK_TOKEN = "meusimplic2026";
const PUSHCUT_URL =
  "https://api.pushcut.io/Ee028sYTepada_oEeEk6n/notifications/MinhaNotifica%C3%A7%C3%A3o";

async function pushcut(title: string, text: string) {
  try {
    await fetch(PUSHCUT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, text }),
    });
  } catch (e) {
    console.error("pushcut error", e);
  }
}

export const Route = createFileRoute("/api/public/pushinpay-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const headerToken = request.headers.get("x-pushinpay-token");
        if (headerToken !== WEBHOOK_TOKEN) {
          return new Response("Unauthorized", { status: 401 });
        }

        let payload: any = null;
        const ct = request.headers.get("content-type") || "";
        try {
          if (ct.includes("application/json")) {
            payload = await request.json();
          } else {
            const fd = await request.formData();
            payload = Object.fromEntries(fd.entries());
          }
        } catch {
          payload = null;
        }

        const status = String(payload?.status ?? "").toLowerCase();
        const value = Number(payload?.value ?? 0);

        if (status === "paid") {
          const valor = value ? (value / 100).toFixed(2).replace(".", ",") : "--";
          await pushcut("PushinPay - Venda Aprovada 🤑", `Valor: R$ ${valor}`);
        }

        return Response.json({ ok: true });
      },
    },
  },
});
