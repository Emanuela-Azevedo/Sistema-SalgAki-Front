import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login/Login.jsx'
import Dashboard from '../pages/Dashboard/Dashboard.jsx'
import PrivateRoute from './PrivateRoute'
import Produtos from '../pages/Produtos/Produtos'
import Categorias from '../pages/Categorias/Categorias'
import Cardapio from '../pages/Cardapio/Cardapio'
import Perfil from '../pages/Perfil/Perfil'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />

            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            >
                {/* 👇 rota default */}
                <Route index element={<Navigate to="produtos" replace />} />
                <Route path="home" element={<Navigate to="/dashboard/produtos" replace />} />
                <Route path="produtos" element={<Produtos />} />
                <Route path="categorias" element={<Categorias />} />
                <Route path="cardapio" element={<Cardapio />} />
                <Route path="perfil" element={<Perfil />} />
            </Route>
        </Routes>
    )
}