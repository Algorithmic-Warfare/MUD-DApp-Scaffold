import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { RouterProvider } from "react-router-dom";

import routes from "src/routes";

createRoot(document.getElementById("react-root")!).render(
  <StrictMode>
    <RainbowKitProvider
      modalSize="compact"
      theme={darkTheme({
        accentColor: "hsla(26, 85%, 58%, 1)",
      })}
    >
      <RouterProvider router={routes} future={{ v7_startTransition: true }} />
    </RainbowKitProvider>
  </StrictMode>
);
