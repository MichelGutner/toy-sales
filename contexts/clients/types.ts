import { TNormalizedClient } from "@/types/clients";

export interface IClientsContextProps {
  clients: TClientsData;
  addClient: (name: string, email: string, born: string) => Promise<unknown>;
  deleteClient: (index: number) => Promise<unknown>;
}

export type TClientsData = {
  data: TNormalizedClient[];
  loading: boolean;
};
