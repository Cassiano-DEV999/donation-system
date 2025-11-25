import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "@/contexts/AuthContext"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { AdminRoute } from "@/components/AdminRoute"
import LoginPage from "@/pages/LoginPage"
import SignupPage from "@/pages/SignupPage"
import DashboardPageNew from "@/pages/DashboardPageNew"
import { CategoriasPage } from "@/pages/CategoriasPage"
import { ProdutosPage } from "@/pages/ProdutosPage"
import { LotesPage } from "@/pages/LotesPage"
import { MovimentacoesPage } from "@/pages/MovimentacoesPage"
import { EtiquetasPage } from "@/pages/EtiquetasPage"
import { UsuariosPage } from "@/pages/UsuariosPage"
import { PerfilPage } from "@/pages/PerfilPage"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPageNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categorias"
            element={
              <ProtectedRoute>
                <CategoriasPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/produtos"
            element={
              <ProtectedRoute>
                <ProdutosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lotes"
            element={
              <ProtectedRoute>
                <LotesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movimentacoes"
            element={
              <ProtectedRoute>
                <MovimentacoesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/etiquetas"
            element={
              <ProtectedRoute>
                <EtiquetasPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <AdminRoute>
                <UsuariosPage />
              </AdminRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <PerfilPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
