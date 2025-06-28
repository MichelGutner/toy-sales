import { ALPHABET } from "@/constants/alphabet";

export const fakeData = {
  data: {
    clientes: [
      {
        info: {
          nomeCompleto: "Ana Beatriz",
          detalhes: {
            email: "ana.b@example.com",
            nascimento: "1992-05-01",
          },
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-01", valor: 150 },
            { data: "2024-01-02", valor: 50 },
          ],
        },
      },
      {
        info: {
          nomeCompleto: "Carlos Eduardo",
          detalhes: {
            email: "cadu@example.com",
            nascimento: "1987-08-15",
          },
        },
        duplicado: {
          nomeCompleto: "Carlos Eduardo",
        },
        estatisticas: {
          vendas: [],
        },
      },
      {
        info: {
          nomeCompleto: `Maria Clara ${ALPHABET}`,
          detalhes: {
            email: "mariaclara@gmail.com",
            nascimento: "1995-12-20",
          },
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-03", valor: 200 },
            { data: "2024-01-04", valor: 300 },
          ],
        },
      }
    ],
  },
  meta: {
    registroTotal: 2,
    pagina: 1,
  },
  redundante: {
    status: "ok",
  },
};
