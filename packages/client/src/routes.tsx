import { createBrowserRouter } from "react-router-dom";

import Redirect from "src/views/Redirect";
import NotFound from "src/views/NotFound";

import App from "src/App";
import UiComponents from "./views/UiComponents";
import OperationsPage from "./views/OperationsPage";
import ActionsPage from "./views/ActionsPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/operations",
          element: <OperationsPage />,
        },
        {
          path: "/operations/:id",
          element: <ActionsPage />,
        },
      ],
    },
    {
      path: "/ui",
      element: <UiComponents />,
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
