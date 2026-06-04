import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// PushinPay (mantemos os nomes de export antigos para não quebrar pagamento.tsx)
const PUSHIN_BASE = "https://api.pushinpay.com.br/api";

const PUSHCUT_URL =
  "https://api.pushcut.io/Ee028sYTepada_oEeEk6n/notifications/MinhaNotifica%C3%A7%C3%A3o";

const VALID_PRODUCTS = {
  phegWIAK: 2990,
  JWkaTFkp: 3167,
  HeuIpgqE: 2430,
} as const;

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
  .inputValidator((data: CreatePixInput) => {
    const parsed = z
      .object({
        productLink: z.string().min(1).max(255),
        paymentValue: z.number().int().positive(),
        name: z.string().min(1).max(255),
        email: z.string().email().max(255),
        document: z.string().regex(/^\d{11}$/),
        phone: z.string().optional(),
      })
      .parse(data);

    const expectedValue = VALID_PRODUCTS[parsed.productLink as keyof typeof VALID_PRODUCTS];
    if (expectedValue === undefined || parsed.paymentValue !== expectedValue) {
      throw new Error("productLink ou paymentValue inválido");
    }
    return parsed;
  })
  .handler(async ({ data }): Promise<CreatePixResult> => {
    try {
      const body = {
        value: data.paymentValue, // centavos
        split_rules: [],
      };

      const res = await fetch(`${PUSHIN_BASE}/pix/cashIn`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PUSHIN_TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok || !json || !json.id || !json.qr_code) {
        console.error("PushinPay createPix error:", res.status, json);
        return {
          ok: false,
          error: json?.message || `Erro ${res.status} ao criar pagamento`,
        };
      }

      const result = {
        ok: true as const,
        transactionId: String(json.id),
        paymentId: String(json.id),
        pixKey: String(json.qr_code),
        totalValue: Number(json.value ?? data.paymentValue),
        expirationDate: "",
      };
      const valorFormatado = (data.paymentValue / 100).toFixed(2).replace(".", ",");
      await pushcut("PushinPay - Pix Gerado ✅", `Valor: R$ ${valorFormatado}`);
      return result;
    } catch (e) {
      console.error("PushinPay createPix exception:", e);
      return { ok: false, error: "Falha ao conectar com o gateway de pagamento." };
    }
  });

export type PaymentStatus =
  | { ok: true; status: string; paid: boolean }
  | { ok: false; error: string };

export const getSigmaPaymentStatus = createServerFn({ method: "POST" })
  .inputValidator((data: { transactionId: string; totalValue?: number }) => data)
  .handler(async ({ data }): Promise<PaymentStatus> => {
    try {
      const res = await fetch(
        `${PUSHIN_BASE}/transactions/${encodeURIComponent(data.transactionId)}`,
        {
          headers: {
            Authorization: `Bearer ${PUSHIN_TOKEN}`,
            Accept: "application/json",
          },
        },
      );
      const json = await res.json().catch(() => null);
      if (!res.ok || !json) {
        return { ok: false, error: json?.message || `Erro ${res.status}` };
      }
      const status = String(json.status ?? "").toLowerCase();
      const paid = status === "paid";
      if (paid && !notifiedPaid.has(data.transactionId)) {
        notifiedPaid.add(data.transactionId);
        const valor = data.totalValue
          ? (data.totalValue / 100).toFixed(2).replace(".", ",")
          : "--";
        await pushcut("PushinPay - Venda Aprovada 🤑", `Valor: R$ ${valor}`);
      }
      return { ok: true, status: status.toUpperCase(), paid };
    } catch (e) {
      console.error("PushinPay status exception:", e);
      return { ok: false, error: "Falha ao consultar status." };
    }
  });
