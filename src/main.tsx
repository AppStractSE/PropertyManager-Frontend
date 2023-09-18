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
    <ClientProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <UserProvider>
            <ReactQueryDevtools position='top-left' />
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </UserProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ClientProvider>
  </React.StrictMode>,
);
