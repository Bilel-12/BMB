import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store.js";

import App from "./App.jsx";
import Connexion from "./components/connexion/connexion.jsx";
import Admin from "./components/admin/admin.jsx";
import Formation from "./components/formation/formation.jsx";
import Condition from "./components/condition/condition.jsx";
import Vision from "./components/vision/vision.jsx";
import About from "./components/about/about.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import GuestRoute from "./components/GuestRoute.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      {/* Page Connexion (bloquée si déjà connecté) */}
      <Route
        path="login"
        element={
          <GuestRoute>
            <Connexion />
          </GuestRoute>
        }
      />

      {/* Page Admin protégée - affichée par défaut après login */}
      <Route
        index
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />

      {/* Page Formation protégée */}
      <Route
        path="formation"
        element={
          <ProtectedRoute>
            <Formation />
          </ProtectedRoute>
        }
      />

      {/* Pages publiques */}
      <Route path="condition" element={<Condition />} />
      <Route path="vision" element={<Vision />} />
      <Route path="about" element={<About />} />

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
