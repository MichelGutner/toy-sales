
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
            { data: "2024-01-01", valor: 150 },
          ],
        },
        duplicado: { nomeCompleto: "Ana Beatriz" },
        redundante: { idInterno: 123 },
      },
      {
        info: {
          nomeCompleto: "Carlos Eduardo",
          detalhes: {
            email: "cadu@example.com",
            nascimento: "1987-08-15",
          },
        },
        infoAlternativa: {
          nomeCompleto: "Carlos Eduardo",
          email: "cadu.duplicado@email.com",
        },
        estatisticas: {
          vendas: [
            { data: "2024-02-01", valor: 300 },
            { data: "2024-02-01", valor: 300 },
          ],
        },
        meta: { criadoEm: "2024-01-01" },
      },
      {
        info: {
          nomeCompleto: "Fernanda Lima",
          detalhes: {
            email: "fernanda@example.com",
            nascimento: "1995-09-20",
          },
        },
        estatisticas: { vendas: [] },
        redundante: { status: "ok" },
      },
      {
        info: {
          nomeCompleto: "João Silva",
          detalhes: {
            email: "joao@example.com",
            nascimento: "1980-10-10",
          },
        },
        estatisticas: {
          vendas: [{ data: "2024-04-01", valor: 500 }],
        },
      },
      {
        info: {
          nomeCompleto: "Mariana Souza",
          detalhes: {
            email: "mariana.s@example.com",
            nascimento: "1990-11-11",
          },
        },
        estatisticas: {
          vendas: [
            { data: "2024-05-01", valor: 100 },
            { data: "2024-05-01", valor: 100 },
            { data: "2024-05-01", valor: 100 },
          ],
        },
      },
      {
        info: {
          nomeCompleto: "Lucas Almeida",
          detalhes: {
            email: "lucas.a@example.com",
            nascimento: "1988-03-22",
          },
        },
        estatisticas: {
          vendas: [
            { data: "2024-06-10", valor: 450 },
            { data: "2024-06-15", valor: 300 },
          ],
        },
      },
      {
        info: {
          nomeCompleto: "Juliana Prado",
          detalhes: {
            email: "juliana.p@example.com",
            nascimento: "1993-07-07",
          },
        },
        estatisticas: {
          vendas: [],
        },
        infoExtra: {
          nascimento: "1993-07-07",
          cpf: "000.000.000-00",
        },
      },
      {
        info: {
          nomeCompleto: "Ricardo Gomes",
          detalhes: {
            email: "ricardo.g@example.com",
            nascimento: "1985-09-09",
          },
        },
        estatisticas: {
          vendas: [{ data: "2024-06-01", valor: 700 }],
        },
        duplicado: {
          nomeCompleto: "Ricardo Gomes",
        },
      },
      {
        info: {
          nomeCompleto: "Patrícia Oliveira",
          detalhes: {
            email: "patricia.o@example.com",
            nascimento: "1996-12-12",
          },
        },
        estatisticas: {
          vendas: [
            { data: "2024-06-20", valor: 200 },
            { data: "2024-06-22", valor: 200 },
            { data: "2024-06-22", valor: 200 },
          ],
        },
      },
      {
        info: {
          nomeCompleto: "Felipe Martins",
          detalhes: {
            email: null,
            nascimento: "1991-01-01",
          },
        },
        estatisticas: {
          vendas: [{ data: "2024-01-10", valor: 100 }],
        },
        redundante: {
          emailAlternativo: "felipe.m@email.com",
        },
      },
    ],
  },
  meta: {
    pagina: 1,
    registroTotal: 10,
  },
  redundante: {
    status: "ok",
    versaoApi: "1.0.0",
  },
};
