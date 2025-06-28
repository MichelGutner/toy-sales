import { ALPHABET } from "@/constants/alphabet";
import { fakeData } from "@/mocks/fakeData";

export const getFakeData = async (): Promise<Cliente[]> => {
  const promise = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeData);
    }, 1000);
  });
  const { data } = promise as typeof fakeData;
  const result = data.clientes.map((cliente) => {
    const missingLetter = getMissingAlphabetLetter(cliente.info.nomeCompleto);

    return {
      ...cliente,
      info: {
        ...cliente.info,
        missingLetter: `Primeira letra a-z: ${missingLetter}`,
      },
    };
  });
  return normalizeClient(result).sort((a, b) => a.name.localeCompare(b.name));
};

const getMissingAlphabetLetter = (name: string): string => {
  const allLetters = ALPHABET.split("");
  const lettersInName = new Set(name.toLowerCase().replace(/[^a-z]/g, ""));
  const missing = allLetters.find((l) => !lettersInName.has(l));
  return missing || "-";
};

type ClienteBruto = any;

export type Cliente = {
  name: string;
  email: string;
  birthDate: string;
  missingAlphabetLetter: string;
  sales: {
    total: number;
    average: number;
    quantity: number;
  };
};

export const normalizeClient = (resposta: any): Cliente[] => {
  if (!resposta) return [];

  return resposta.map((cliente: ClienteBruto): Cliente => {
    const name = cliente?.info?.nomeCompleto ?? "";
    const email = cliente?.info?.detalhes?.email ?? "";
    const birthDate = cliente?.info?.detalhes?.nascimento ?? "";
    const missingAlphabetLetter = cliente?.info?.missingLetter ?? "-";

    const sales = cliente.estatisticas?.vendas ?? [];

    const total = sales.reduce(
      (acc: number, current: { data: string; valor: number }) =>
        acc + (current.valor ?? 0),
      0
    );
    const quantity = sales.length;
    const average = quantity > 0 ? total / quantity : 0;

    const result = {
      name,
      email,
      birthDate,
      missingAlphabetLetter,
      sales: {
        total,
        average,
        quantity,
      },
    };

    return result;
  });
};
