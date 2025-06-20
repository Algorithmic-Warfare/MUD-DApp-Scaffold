import { createBrowserRouter } from "react-router-dom";

import Redirect from "@/views/utils/Redirect";
import NotFound from "@/views/utils/NotFound";

import App from "src/App";
import UIComponentView from "./views/dev/UIComponentView";
import LandingPage from "./views/pages/LandingPage";
import MudSyncStatusView from "./views/dev/MudSyncStatusView";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/dev/mud",
          element: <MudSyncStatusView />,
          children: [],
        },
      ],
    },
    {
      path: "/dev/ui",
      element: <UIComponentView />,
      children: [],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
