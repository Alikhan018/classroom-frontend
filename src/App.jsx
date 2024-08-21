import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import AddEntity from "./pages/AddEntity";
import WithAuth from "./hoc/WithAuth";
import ProtectedRoute from "./hoc/ProtectedComponent";
import Settings from "./pages/Settings";
import Roles from "./pages/Roles";
import Groups from "./pages/Groups";
import ViewPage from "./pages/ViewPage";
import ViewEntityPage from "./pages/ViewEntityPage";

const ProtectedLayout = WithAuth(Layout);

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<ProtectedLayout />}>
            <Route path="home" element={<Home />} />
            <Route
              path="students"
              element={
                <ProtectedRoute
                  element={Students}
                  requiredPerms={[{ name: "Read", entityType: "Students" }]}
                />
              }
            />
            <Route
              path="teachers"
              element={
                <ProtectedRoute
                  element={<Teachers />}
                  requiredPerms={[{ name: "Read", entityType: "Teachers" }]}
                />
              }
            />
            <Route
              path="teachers/add"
              element={
                <ProtectedRoute
                  element={<AddEntity entity={"teachers"} />}
                  requiredPerms={[{ name: "All", entityType: "Admin" }]}
                />
              }
            />
            <Route
              path="students/add"
              element={
                <ProtectedRoute
                  element={<AddEntity entity={"students"} />}
                  requiredPerms={[{ name: "All", entityType: "Admin" }]}
                />
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedRoute
                  element={<Settings />}
                  requiredPerms={[{ name: "Read", entityType: "Teachers" }]}
                />
              }
            />
            <Route
              path="roles"
              element={
                <ProtectedRoute
                  element={<Roles />}
                  requiredPerms={[{ name: "Read", entityType: "Teachers" }]}
                />
              }
            />
            <Route
              path="groups"
              element={
                <ProtectedRoute
                  element={<Groups />}
                  requiredPerms={[{ name: "Read", entityType: "Teachers" }]}
                />
              }
            />
            <Route
              path="groups/:id"
              element={
                <ProtectedRoute
                  element={<ViewPage entity={"groups"} />}
                  requiredPerms={[{ name: "Read", entityType: "Teachers" }]}
                />
              }
            />
            <Route
              path="roles/:id"
              element={
                <ProtectedRoute
                  element={<ViewPage entity={"roles"} />}
                  requiredPerms={[{ name: "Read", entityType: "Teachers" }]}
                />
              }
            />
            <Route
              path="students/:id"
              element={
                <ProtectedRoute
                  element={<ViewEntityPage entity={"students"} />}
                  requiredPerms={[{ name: "Read", entityType: "Teachers" }]}
                />
              }
            />
            <Route
              path="teachers/:id"
              element={
                <ProtectedRoute
                  element={<ViewEntityPage entity={"teachers"} />}
                  requiredPerms={[{ name: "Read", entityType: "Teachers" }]}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
