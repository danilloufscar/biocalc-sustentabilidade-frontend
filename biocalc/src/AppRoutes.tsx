import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { MainLayout } from "./pages/MainLayout"
import { DashboardPage } from "./pages/DashboardPage"
import { CalculatorPage } from "./pages/CalculatorPage"
import { RegisterPage } from "./pages/RegisterPage"

const AppRoutes = () => {
  return (
    <>
    <BrowserRouter basename="/biocalc">
    <Routes>
        <Route index path="" element={<Navigate to="login" />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="" element={<MainLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="calculator" element={<CalculatorPage />} />
        </Route>
        <Route path="register-account" element={<RegisterPage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default AppRoutes