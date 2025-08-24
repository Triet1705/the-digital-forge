import { createBrowserRouter } from "react-router-dom";
import HomePage from "./src/pages/HomePage";
import App from "./src/App.jsx";
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
      // {
      //   path: "about",
      //   element: <AboutPage />,
      // },
    ],
  },
]);

export default router;
