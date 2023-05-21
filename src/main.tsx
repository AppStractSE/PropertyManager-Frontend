import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ClientProvider from "./contexts/ClientContext";
import ThemeProvider from "./contexts/ThemeContext";
import UserProvider from "./contexts/UserContext";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClientProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools position='top-left' />
          <UserProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </UserProvider>
        </QueryClientProvider>
      </ClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
