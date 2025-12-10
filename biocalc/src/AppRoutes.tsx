import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

// Páginas existentes
import { LoginPage } from "./pages/LoginPage"
import { MainLayout } from "./pages/MainLayout"
import { DashboardPage } from "./pages/DashboardPage"
import { RegisterPage } from "./pages/RegisterPage"
import { UserProfilePage } from "./pages/UserProfilePage"
import { CalculatorOrchestrator } from "./pages/calculator/CalculatorOrchestrator"
import { PrivateRoute } from "./components/PrivateRoute"

const AppRoutes = () => {
  return (
    <BrowserRouter basename="/biocalc">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-account" element={<RegisterPage />} />

        <Route element={<MainLayout />}>
            <Route path="/dashboard" element={
               <PrivateRoute>
                  <DashboardPage />
               </PrivateRoute>
         } />
            <Route path="/calculator" element={
                <PrivateRoute>
              <CalculatorOrchestrator />
              </PrivateRoute>
            } />
            <Route path="/projects" element={<div className="p-8">Meus Projetos - Em construção</div>} />
            <Route path="/profile" element={
                <PrivateRoute>
              <UserProfilePage/>
              </PrivateRoute>
              } />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes