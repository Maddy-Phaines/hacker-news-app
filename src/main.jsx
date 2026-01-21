import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Tooltip from "@radix-ui/react-tooltip";

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
      <QueryClientProvider client={queryClient}>
        <Tooltip.Provider delayDuration={300}>
          <App />
        </Tooltip.Provider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
