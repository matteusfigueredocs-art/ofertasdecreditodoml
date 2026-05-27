import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ELAIFLOW_TOKEN =
  "56fb9cbc8d3a7cf7d1c1c8ac12730ec883f150a7134687099bab95058c76aaab";

export const consultarCPF = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({ cpf: z.string().regex(/^\d{11}$/) }).parse(input)
  )
  .handler(async ({ data }) => {
    try {
      const url = `https://bk.elaiflow.dev/consultar-filtrada/cpf?cpf=${data.cpf}&token=${ELAIFLOW_TOKEN}`;
      const res = await fetch(url);
      if (!res.ok) {
        return { ok: false as const, error: `Erro na consulta (${res.status})` };
      }
      const json = (await res.json()) as {
        cpf?: string;
        nome?: string;
        mae?: string;
        sexo?: string;
        nascimento?: string;
      };
      if (!json?.nome) {
        return { ok: false as const, error: "CPF não encontrado" };
      }
      return {
        ok: true as const,
        data: {
          cpf: json.cpf ?? data.cpf,
          nome: json.nome,
          mae: json.mae ?? "",
          sexo: json.sexo ?? "",
          nascimento: json.nascimento ?? "",
        },
      };
    } catch (err) {
      console.error("consultarCPF error", err);
      return { ok: false as const, error: "Falha ao consultar CPF" };
    }
  });
