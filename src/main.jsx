import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 1) Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // retry failed fetches once
      staleTime: 5 * 60_000, // globally cache for 5 minutes
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* 2) Wrap your entire app */}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
