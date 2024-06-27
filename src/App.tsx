// import { IUsersResponse } from "./interfaces";
// import { useGetUserList } from "./services/getAllUser.service";

// function App() {
//   const { data } = useGetUserList();

//   console.log("data", data);
//   return (
//     <>
//       {data?.map((user: IUsersResponse) => {
//         return (
//           <div key={user.UsuarioID}>
//             <h1>{user.Nombre}</h1>
//             <p>{user.Rol?.Description}</p>
//           </div>
//         );
//       })}
//     </>
//   );
// }

// export default App;

import { Home } from "./pages/Home";
import Mainlayout from "./components/Mainlayout";
import Login from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";

import { Suspense } from "react";
import { Users } from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { Appointments } from "./pages/Appointments";
import { Medicines } from "./pages/Medicines";

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
          <Route
            path="/medicines"
            element={
              <Suspense fallback={<div>Cargando...</div>}>
                <Medicines />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
