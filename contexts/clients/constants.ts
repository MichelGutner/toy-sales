import { extensionClientsList } from "./mock";

const clientesBase = [
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
];

export const data = { clients: [...clientesBase, ...extensionClientsList] };

export const initialState = {
  data: [],
  loading: true,
};
