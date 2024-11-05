import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import AuthProvider from "./contexts/useAuth"
import Login from "./components/pages/Login"
import ProtectedRoute from "./components/layout/ProtectedRoute"
import Editor from "./components/pages/Editor"

function App() {

  return (
    <>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
            <Route index element={<h1>Home</h1>} />
            <Route path="editor" element={<ProtectedRoute element={<Editor />} />} />
        </Route>
        <Route path="/login" element={<Login />}/>
      </Routes>
      
      </AuthProvider>
    </>
  )
}

export default App
