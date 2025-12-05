/**
 * Sistema de Gestão de Doações
 * Copyright (c) 2025 Cassiano Melo
 *
 * Este projeto é software livre: você pode redistribuí-lo e/ou modificá-lo
 * sob os termos da Licença MIT conforme publicada pela Open Source Initiative.
 *
 * GitHub: https://github.com/Cassiano-DEV999/donation-system
 * Autor: Cassiano Melo <cassianomeloprofissional@gmail.com>
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/features/auth";
import { ThemeProvider } from "@/components/theme-provider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminRoute } from "@/components/AdminRoute";
import { MainLayout } from "@/components/layout/MainLayout";
import { queryClient } from "@/shared/api/queryClient";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import DashboardPageNew from "@/pages/DashboardPageNew";
import { CategoriasPageNew } from "@/pages/CategoriasPageNew";
import { ProdutosPageNew } from "@/pages/ProdutosPageNew";
import { LotesPageNew } from "@/pages/LotesPageNew";
import { MovimentacoesPageNew } from "@/pages/MovimentacoesPageNew";
import { EtiquetasPage } from "@/pages/EtiquetasPage";
import { DoacoesPage } from "@/pages/DoacoesPage";
import { UsuariosPageNew } from "@/pages/UsuariosPageNew";
import { PerfilPage } from "@/pages/PerfilPage";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="ong-theme">
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected Routes with Layout */}
              <Route
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/dashboard" element={<DashboardPageNew />} />
                <Route path="/categorias" element={<CategoriasPageNew />} />
                <Route path="/produtos" element={<ProdutosPageNew />} />
                <Route path="/lotes" element={<LotesPageNew />} />
                <Route
                  path="/movimentacoes"
                  element={<MovimentacoesPageNew />}
                />
                <Route path="/etiquetas" element={<EtiquetasPage />} />
                <Route path="/doacoes" element={<DoacoesPage />} />
                <Route path="/perfil" element={<PerfilPage />} />
              </Route>

              {/* Admin Only Routes with Layout */}
              <Route
                element={
                  <AdminRoute>
                    <MainLayout />
                  </AdminRoute>
                }
              >
                <Route path="/usuarios" element={<UsuariosPageNew />} />
              </Route>

              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
