// src/services/mockApi.ts

export interface Cliente {
  nome: string;
  email: string;
  nascimento: string;
}

const clientesBase = [
  {
    info: {
      nomeCompleto: 'Ana Beatriz',
      detalhes: {
        email: 'ana.b@example.com',
        nascimento: '1992-05-01',
      },
    },
    estatisticas: {
      vendas: [
        { data: '2024-01-01', valor: 150 },
        { data: '2024-01-02', valor: 50 },
      ],
    },
  },
  {
    info: {
      nomeCompleto: 'Carlos Eduardo',
      detalhes: {
        email: 'cadu@example.com',
        nascimento: '1987-08-15',
      },
    },
    duplicado: {
      nomeCompleto: 'Carlos Eduardo',
    },
    estatisticas: {
      vendas: [],
    },
  },
];

let clients = [...clientesBase];

export const mockApi = {
  login: async (email: string, password: string) => {
    if (email && password) return { token: 'fake-jwt-token' };
    throw new Error('Invalid credentials');
  },

  listClientes: async (filter: string = '') => {
    const filtered = clients.filter((cliente) =>
      cliente.info.nomeCompleto.toLowerCase().includes(filter.toLowerCase()) ||
      cliente.info.detalhes.email.toLowerCase().includes(filter.toLowerCase())
    );
    return {
      data: { clientes: filtered },
      meta: { registroTotal: filtered.length, pagina: 1 },
    };
  },

  createCliente: async (cliente: Cliente) => {
    clients.push({
      info: {
        nomeCompleto: cliente.nome,
        detalhes: {
          email: cliente.email,
          nascimento: cliente.nascimento,
        },
      },
      estatisticas: { vendas: [] },
    });
  },

  updateCliente: async (index: number, updates: Partial<Cliente>) => {
    const cliente = clients[index];
    if (!cliente) throw new Error('Cliente não encontrado');
    cliente.info.nomeCompleto = updates.nome || cliente.info.nomeCompleto;
    cliente.info.detalhes.email = updates.email || cliente.info.detalhes.email;
    cliente.info.detalhes.nascimento = updates.nascimento || cliente.info.detalhes.nascimento;
  },

  deleteCliente: async (index: number) => {
    clients.splice(index, 1);
  },

  getEstatisticas: async () => {
    const totalPorDia: Record<string, number> = {};
    let volumeMax = { nome: '', total: 0 };
    let mediaMax = { nome: '', media: 0 };
    let freqMax = { nome: '', dias: 0 };

    clients.forEach((cliente) => {
      const vendas = cliente.estatisticas.vendas;
      const nome = cliente.info.nomeCompleto;
      const total = vendas.reduce((acc, cur) => acc + cur.valor, 0);
      const diasUnicos = new Set(vendas.map((v) => v.data)).size;
      const media = vendas.length > 0 ? total / vendas.length : 0;

      vendas.forEach(({ data, valor }) => {
        totalPorDia[data] = (totalPorDia[data] || 0) + valor;
      });

      if (total > volumeMax.total) volumeMax = { nome, total };
      if (media > mediaMax.media) mediaMax = { nome, media };
      if (diasUnicos > freqMax.dias) freqMax = { nome, dias: diasUnicos };
    });

    return {
      totalPorDia,
      destaque: {
        volumeMax,
        mediaMax,
        freqMax,
      },
    };
  },
};
