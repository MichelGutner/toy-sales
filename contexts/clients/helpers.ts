import { ALPHABET } from "@/constants/alphabet";
import { TClient, TNormalizedClient } from "@/types/clients";

export const enrichClients = (clients: TClient[]): TNormalizedClient[] => {
  const enrichedClients = clients.map((client) => {
    const missingLetter = findMissingAlphabetLetter(client.info.nomeCompleto);

    return {
      ...client,
      info: {
        ...client.info,
        missingLetter: `a-z: ${missingLetter}`,
      },
    };
  });
  return normalizeClients(enrichedClients).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
};

export const findMissingAlphabetLetter = (name: string): string => {
  const alphabetLetters = ALPHABET.split("");
  const lettersInName = new Set(name.toLowerCase().replace(/[^a-z]/g, ""));
  const missingLetter = alphabetLetters.find(
    (letter) => !lettersInName.has(letter)
  );
  return missingLetter || "-";
};

export const normalizeClients = (clients: TClient[]): TNormalizedClient[] => {
  if (!clients) return [];

  return clients.map((cliente) => {
    const name = cliente?.info?.nomeCompleto ?? "";
    const email = cliente?.info?.detalhes?.email ?? "";
    const birthDate = cliente?.info?.detalhes?.nascimento ?? "";
    const missingAlphabetLetter = cliente?.info?.missingLetter ?? "-";
    const statistics = cliente?.estatisticas ?? {};

    const sales = statistics.vendas ?? [];

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
      statistics: { ...statistics, total, average, quantity },
    };

    return result;
  });
};

export const createNewClient = (name: string, email: string, born: string) => {
  return {
    info: {
      nomeCompleto: name,
      detalhes: {
        email: email,
        nascimento: born,
      },
    },
    estatisticas: { vendas: [] },
  };
};
