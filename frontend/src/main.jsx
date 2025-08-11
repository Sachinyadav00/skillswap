import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/routes";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux-store/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </Provider>
  </StrictMode>
);
