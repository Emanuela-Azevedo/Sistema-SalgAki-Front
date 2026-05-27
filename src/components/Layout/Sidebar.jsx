import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Sidebar.module.css'

export default function Sidebar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <aside className={styles.sidebar}>
            <h2 className={styles.logo}>SalgAki</h2>

            <nav className={styles.nav}>
                <Link to="/dashboard/produtos">Produtos</Link>
                <Link to="/dashboard/categorias">Categorias</Link>
                <button className={styles.navButton} onClick={handleLogout}>Sair</button>
            </nav>
        </aside>
    )
}