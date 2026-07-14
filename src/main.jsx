import "./index.css";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import AuthProvider from "./Provider/AuthProvider";
import Router from "./routers/Router";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <>
    <Toaster />
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={Router} />
      </AuthProvider>
    </Provider>
  </>,
);
