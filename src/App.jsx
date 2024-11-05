import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AuthProvider from "./contexts/useAuth";
import Login from "./components/pages/Login";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Editor from "./components/pages/Editor";
import DataProvider from "./contexts/useData";
import Home from "./components/pages/Home";

function App() {
  return (
    <>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route
                path="editor"
                element={<ProtectedRoute element={<Editor />} />}
              />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </>
  );
}

export default App;
