import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import AddEntity from "./pages/AddEntity";
import WithAuth from "./hoc/WithAuth";
import ProtectedRoute from "./hoc/ProtectedComponent";

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
                  requiredPerms={[{ name: "Read", entityType: "Teachers" }]}
                />
              }
            />
            <Route
              path="teachers"
              element={
                <ProtectedRoute
                  element={<Teachers />}
                  requiredPerms={[{ name: "Read", entityType: "Students" }]}
                />
              }
            />
            <Route
              path="teachers/add"
              element={
                <ProtectedRoute
                  element={<AddEntity entity={"teachers"} />}
                  requiredPerms={[{ name: "Create", entityType: "Admin" }]}
                />
              }
            />
            <Route
              path="students/add"
              element={
                <ProtectedRoute
                  element={
                    <AddEntity
                      entity={"students"}
                      requiredPerms={[{ name: "Create", entityType: "Admin" }]}
                    />
                  }
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
