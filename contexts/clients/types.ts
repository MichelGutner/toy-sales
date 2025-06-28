import { TNormalizedClient } from "@/types/clients";

export interface IClientsContextProps {
  clients: TClientsData & {
    withMostSales: TNormalizedClient;
    withMostAverage: TNormalizedClient;
    withMostPurchases: TNormalizedClient;
  };
  addClient: (name: string, email: string, born: string) => Promise<unknown>;
  deleteClient: (index: number) => Promise<unknown>;
}

export type TClientsData = {
  data: TNormalizedClient[];
  loading: boolean;
};
