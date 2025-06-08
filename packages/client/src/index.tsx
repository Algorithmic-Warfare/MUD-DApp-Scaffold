import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import routes from "src/routes";
import { WalletProvider } from "./components/mud";

createRoot(document.getElementById("react-root")!).render(
  <StrictMode>
    <WalletProvider>
      <RouterProvider router={routes} future={{ v7_startTransition: true }} />
    </WalletProvider>
  </StrictMode>
);
