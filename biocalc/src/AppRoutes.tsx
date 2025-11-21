import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"

const AppRoutes = () => {
  return (
    <>
    <BrowserRouter basename="/biocalc">
    <Routes>
        <Route path="" element={<LoginPage onLogin={function (): void {
                      throw new Error("Function not implemented.")
                  } } onNavigateToRegister={function (): void {
                      throw new Error("Function not implemented.")
                  } } />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default AppRoutes