import { createServerFn } from "@tanstack/react-start";

const SIGMA_BASE = "https://api.sigmapayments.com.br";
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

const notifiedPaid = new Set<string>();

export type CreatePixInput = {
  productLink: string;
  paymentValue: number; // centavos
  name: string;
  email: string;
  document: string; // CPF apenas dígitos
  phone?: string;
};

export type CreatePixResult =
  | {
      ok: true;
      transactionId: string;
      paymentId: string;
      pixKey: string; // BR Code (copia e cola)
      totalValue: number;
      expirationDate: string;
    }
  | { ok: false; error: string };

export const createSigmaPix = createServerFn({ method: "POST" })
  .inputValidator((data: CreatePixInput) => data)
  .handler(async ({ data }): Promise<CreatePixResult> => {
    try {
      const body = {
        paymentMethod: "pix",
        productLink: data.productLink,
        paymentValue: data.paymentValue,
        useTwoCards: false,
        customer: {
          name: data.name,
          email: data.email,
          document: data.document.replace(/\D/g, ""),
          ...(data.phone ? { phone: data.phone } : {}),
        },
      };

      const res = await fetch(`${SIGMA_BASE}/api/v1/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok || !json || json.hasError) {
        console.error("Sigma createPix error:", res.status, json);
        return {
          ok: false,
          error: json?.message || json?.error || `Erro ${res.status} ao criar pagamento`,
        };
      }

      const d = json.data;
      const result = {
        ok: true as const,
        transactionId: d.transaction_id,
        paymentId: d.payment_data?.payment_id,
        pixKey: d.payment_data?.pix_key,
        totalValue: d.payment_data?.total_transaction_value ?? d.total_value,
        expirationDate: d.payment_data?.expiration_date,
      };
      const valorFormatado = (data.paymentValue / 100).toFixed(2).replace(".", ",");
      await pushcut(
        "SigmaPay - Pix Gerado ✅",
        `Valor: R$ ${valorFormatado}`,
      );
      return result;
    } catch (e) {
      console.error("Sigma createPix exception:", e);
      return { ok: false, error: "Falha ao conectar com o gateway de pagamento." };
    }
  });

export type PaymentStatus =
  | { ok: true; status: string; paid: boolean }
  | { ok: false; error: string };

export const getSigmaPaymentStatus = createServerFn({ method: "POST" })
  .inputValidator((data: { transactionId: string }) => data)
  .handler(async ({ data }): Promise<PaymentStatus> => {
    try {
      const res = await fetch(
        `${SIGMA_BASE}/api/v1/payments/${encodeURIComponent(data.transactionId)}/status`,
      );
      const json = await res.json().catch(() => null);
      if (!res.ok || !json || json.hasError) {
        return { ok: false, error: json?.message || `Erro ${res.status}` };
      }
      const status = String(json.data?.status ?? json.status ?? "").toUpperCase();
      const paid = status === "AUTHORIZED" || status === "APPROVED" || status === "PAID" || status === "COMPLETED";
      if (paid && !notifiedPaid.has(data.transactionId)) {
        notifiedPaid.add(data.transactionId);
        await pushcut(
          "✅ Venda confirmada",
          `Pagamento aprovado • TX ${data.transactionId}`,
        );
      }
      return { ok: true, status, paid };
    } catch (e) {
      console.error("Sigma status exception:", e);
      return { ok: false, error: "Falha ao consultar status." };
    }
  });
