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

  // const listClientes = async (filter: string = "") => {
  //   const filtered = clients.filter(
  //     (cliente) =>
  //       cliente.info.nomeCompleto
  //         .toLowerCase()
  //         .includes(filter.toLowerCase()) ||
  //       cliente.info.detalhes.email.toLowerCase().includes(filter.toLowerCase())
  //   );

  //   return {
  //     data: { clientes: filtered },
  //     meta: { registroTotal: filtered.length, pagina: 1 },
  //   };
  // };

  // const createCliente = async (cliente: Cliente) => {
  //   clients.push({
  //     info: {
  //       nomeCompleto: cliente.nome,
  //       detalhes: {
  //         email: cliente.email,
  //         nascimento: cliente.nascimento,
  //       },
  //     },
  //     estatisticas: { vendas: [] },
  //   });
  // };

  // const updateCliente = async (index: number, updates: any) => {
  //   const cliente = clients[index];
  //   if (!cliente) throw new Error("Cliente não encontrado");
  //   cliente.info.nomeCompleto = updates.nome || cliente.info.nomeCompleto;
  //   cliente.info.detalhes.email = updates.email || cliente.info.detalhes.email;
  //   cliente.info.detalhes.nascimento =
  //     updates.nascimento || cliente.info.detalhes.nascimento;
  // };

  // const deleteCliente = async (index: number) => {
  //   clients.splice(index, 1);
  // };

  // const getEstatisticas = async () => {
  //   const totalPorDia: Record<string, number> = {};
  //   let volumeMax = { nome: "", total: 0 };
  //   let mediaMax = { nome: "", media: 0 };
  //   let freqMax = { nome: "", dias: 0 };

  //   clients.forEach((cliente) => {
  //     const vendas = cliente.estatisticas.vendas;
  //     const nome = cliente.info.nomeCompleto;
  //     const total = vendas.reduce((acc, cur) => acc + cur.valor, 0);
  //     const diasUnicos = new Set(vendas.map((v) => v.data)).size;
  //     const media = vendas.length > 0 ? total / vendas.length : 0;

  //     vendas.forEach(({ data, valor }) => {
  //       totalPorDia[data] = (totalPorDia[data] || 0) + valor;
  //     });

  //     if (total > volumeMax.total) volumeMax = { nome, total };
  //     if (media > mediaMax.media) mediaMax = { nome, media };
  //     if (diasUnicos > freqMax.dias) freqMax = { nome, dias: diasUnicos };
  //   });

  //   return {
  //     totalPorDia,
  //     destaque: {
  //       volumeMax,
  //       mediaMax,
  //       freqMax,
  //     },
  //   };
  // };

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
        clients,
        addClient,
        deleteClient,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};
