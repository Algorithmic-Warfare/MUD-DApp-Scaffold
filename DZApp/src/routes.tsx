import { createBrowserRouter } from "react-router-dom";

import Redirect from "src/views/Redirect";
import NotFound from "src/views/NotFound";

import App from "src/App";
import DevIndex from "./views/dev/DevIndex";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [],
    },
    {
      path: "/dev",
      element: <DevIndex />,
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
