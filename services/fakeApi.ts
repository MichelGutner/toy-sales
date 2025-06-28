import { ALPHABET } from "@/constants/alphabet";
import { fakeData } from "@/mocks/fakeData";

export const getFakeData = async (): Promise<any> => {
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
  return result;
};

const getMissingAlphabetLetter = (name: string): string => {
  const allLetters = ALPHABET.split("");
  const lettersInName = new Set(name.toLowerCase().replace(/[^a-z]/g, ""));
  const missing = allLetters.find((l) => !lettersInName.has(l));
  return missing || "-";
};
