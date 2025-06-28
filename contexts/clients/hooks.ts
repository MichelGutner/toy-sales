import { useContext } from "react";
import { ClientsContext } from "./provider";

export const useClientsContext = () => {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
