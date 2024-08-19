import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import AddEntity from "./pages/AddEntity";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="students" element={<Students />} />
            <Route path="teachers" element={<Teachers />} />
            <Route
              path="teachers/add"
              element={<AddEntity entity={"teachers"} />}
            />
            <Route
              path="students/add"
              element={<AddEntity entity={"students"} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
