import { useEffect, useRef, useState } from "react";

type TUseFilterDataProps<T> = [
  onFilter: (arg: string) => void,
  { data: T[]; previousData: T[] }
];

export const useFilterData = <TData>(
  data: TData[],
  propertyNameToFilter: keyof TData,
  initWithData = true
): TUseFilterDataProps<TData> => {
  const initialData = initWithData ? data : null;
  const previousData = useRef<TData[]>([]);
  const [filteredData, setFilteredData] = useState<TData[]>(
    initialData as TData[]
  );

  const onFilterData = (term: string) => {
    if (term && term.trim() !== "") {
      const newData = data?.filter((item) => {
        // @ts-ignore
        return hasText(item[propertyNameToFilter], term);
      });
      const sortedByBestMatch = newData
        ?.map((a) => {
          const getProperty = a[propertyNameToFilter] as string;
          // @ts-ignore
          const isBestMatch = findBestMatch(term, getProperty);
          const value = isBestMatch?.value;
          const name =
            isBestMatch?.name === getProperty.trim().toLowerCase()
              ? getProperty
              : isBestMatch?.name;
          return { ...a, name, value };
        })
        //@ts-ignore
        .sort((a, b) => a.value - b.value);
      setFilteredData(sortedByBestMatch);
    } else {
      setFilteredData(initialData as TData[]);
    }
  };

  useEffect(() => {
    if (!previousData.current && data) {
      previousData.current = data;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousData.current, data]);

  useEffect(() => {
    if (previousData.current !== data) {
      onFilterData("");
      previousData.current = data;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return [
    onFilterData,
    { data: filteredData, previousData: previousData.current },
  ];
};

export const stringToLower = (input: string): string =>
  input.trim().toLowerCase();

export const hasText = (str: string, text: string) =>
  stringToLower(str).includes(stringToLower(text));

const findBestMatch = (term: string, field: string) => {
  const cleanedTerm = term.trim().toLowerCase();
  const cleanedInput = field.trim().toLowerCase();

  const mapped = new Map<string, Record<string, unknown>>();
  const individualCharacters = cleanedInput.split("");

  for (let i = 0; i < individualCharacters.length; i++) {
    if (cleanedTerm.includes(individualCharacters[i])) {
      if (mapped.has(cleanedInput)) {
        const prev = mapped.get(cleanedInput);
        if (prev?.name !== cleanedInput) {
          mapped.set(cleanedInput, {
            value: prev ?? 0 + i,
            name: cleanedInput,
          });
        }
      } else {
        mapped.set(cleanedInput, {
          value: i,
          name: cleanedInput,
        });
      }
    }
  }

  return mapped.get(cleanedInput);
};
