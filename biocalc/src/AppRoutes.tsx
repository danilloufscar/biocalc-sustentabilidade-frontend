import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

// Páginas existentes
import { LoginPage } from "./pages/LoginPage"
import { MainLayout } from "./pages/MainLayout"
import { DashboardPage } from "./pages/DashboardPage"
import { RegisterPage } from "./pages/RegisterPage"
import { UserProfilePage } from "./pages/UserProfilePage"
import { CalculatorOrchestrator } from "./pages/calculator/CalculatorOrchestrator"

const AppRoutes = () => {
  return (
    <BrowserRouter basename="/biocalc">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-account" element={<RegisterPage />} />

        <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/calculator" element={<CalculatorOrchestrator />} />
            <Route path="/projects" element={<div className="p-8">Meus Projetos - Em construção</div>} />
            <Route path="/profile" element={<UserProfilePage/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes