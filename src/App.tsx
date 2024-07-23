import { Home } from "./pages/Home";
import Mainlayout from "./components/Mainlayout";
import Login from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";

import { Suspense } from "react";
import { Clients } from "./pages/Clients";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { Appointments } from "./pages/Appointments";
import { Users } from "./pages/Users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<Mainlayout />}>
          <Route
            path="/home"
            element={
              <Suspense fallback={<div>Cargando...</div>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/clients"
            element={
              <Suspense fallback={<div>Cargando...</div>}>
                <Clients />
              </Suspense>
            }
          />
          <Route
            path="/users"
            element={
              <Suspense fallback={<div>Cargando...</div>}>
                <Users />
              </Suspense>
            }
          />

          <Route
            path="/appointments"
            element={
              <Suspense fallback={<div>Cargando...</div>}>
                <Appointments />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
