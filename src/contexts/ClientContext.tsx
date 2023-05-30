import React from "react";
import { createContext, ReactNode, useContext } from "react";
import { Client } from "../api/client";

interface ClientContext {
  client: Client;
}

const ClientContext = createContext<ClientContext>({ client: new Client() });

interface Props {
  children: ReactNode;
}

function ClientProvider({ children }: Props) {
  return (
    <ClientContext.Provider value={{ client: new Client() }}>{children}</ClientContext.Provider>
  );
}

export const useClient = (): Client => {
  const { client } = useContext(ClientContext);
  return client;
};

export default ClientProvider;
