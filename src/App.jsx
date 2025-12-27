import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Layout from "./pages/layout";
import View from "./pages/view";
import CVBuilder from "./pages/CV-builder";
import "./App.css";
import ProtectedRoute from "./config/protectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="builder/:id" element={<CVBuilder />} />
        </Route>
        <Route path="/view/:id" element={<View />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
