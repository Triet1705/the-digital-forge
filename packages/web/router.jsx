import { createBrowserRouter } from "react-router-dom";
import HomePage from "./src/pages/home-page/HomePage.jsx";
import App from "./src/App.jsx";
import ModelListPage from "./src/pages/model-list/ModelListPage.jsx";
// import NotFoundPage from './pages/NotFoundPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "models",
        element: <ModelListPage />,
      },
      // {
      //   path: "about",
      //   element: <AboutPage />,
      // },
    ],
  },
]);

export default router;
