import { TClient } from "@/types/clients";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { data, initialState } from "./constants";
import { createNewClient, enrichClients } from "./helpers";
import { IClientsContextProps, TClientsData } from "./types";

export const ClientsContext = createContext<IClientsContextProps | null>(null);

export const ClientsProvider = ({ children }: PropsWithChildren) => {
  const [clients, setClients] = useState<TClientsData>(initialState);

  const addClient = (name: string, email: string, born: string) => {
    const newClient = createNewClient(name, email, born);

    return new Promise((resolve) => {
      setTimeout(() => {
        const enrichedClient = enrichClients([newClient])[0];
        setClients((prev) => ({
          ...prev,
          data: [...prev.data, enrichedClient],
        }));
        resolve(enrichedClient);
      }, 1000);
    });
  };

  const deleteClient = (index: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setClients((prev) => {
          const updatedData = [...prev.data];
          updatedData.splice(index, 1);
          return { ...prev, data: updatedData };
        });
        resolve(true);
      }, 1000);
    });
  };

  const withMostSales = clients.data.reduce((prev, current) => {
    return prev.statistics.total > current.statistics.total ? prev : current;
  }, clients.data[0]);

  const withMostAverage = clients.data.reduce((prev, current) => {
    return prev.statistics.average > current.statistics.average
      ? prev
      : current;
  }, clients.data[0]);

  const withMostPurchases = clients.data.reduce((prev, current) => {
    return prev.statistics.quantity > current.statistics.quantity
      ? prev
      : current;
  }, clients.data[0]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(data.clients);
        }, 1000);
      });
      const normalizedData = enrichClients(response as TClient[]);
      setClients({ data: normalizedData, loading: false });
    };
    fetchData();
  }, []);

  return (
    <ClientsContext.Provider
      value={{
        clients: {
          withMostSales,
          withMostAverage,
          withMostPurchases,
          ...clients,
        },
        addClient,
        deleteClient,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};
