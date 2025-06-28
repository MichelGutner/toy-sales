export interface ICliente {
  clientes: TClient[];
}

export type TClient = {
  info: {
    nomeCompleto: string;
    missingLetter?: string;
    detalhes: {
      email: string;
      nascimento: string;
    };
  };
  estatisticas: {
    vendas: {
      data: string;
      valor: number;
    }[];
  };
  duplicado?: {
    nomeCompleto: string;
  };
};

export type TNormalizedClient = {
  name: string;
  email: string;
  birthDate: string;
  missingAlphabetLetter: string;
  statistics: {
    total: number;
    average: number;
    quantity: number;
    vendas: {
      data: string;
      valor: number;
    }[];
  };
};
