import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Sidebar.module.css'

export default function Sidebar() {
    const { user, logout } = useAuth()

    return (
        <aside className={styles.sidebar}>
            <h2 className={styles.logo}>SalgAki</h2>

            <nav className={styles.nav}>
                <Link to="/dashboard/home">Menu</Link>
                <Link to="/dashboard/produtos">Produtos</Link>
                <Link to="/dashboard/categorias">Categorias</Link>

            </nav>

            <div className={styles.userCard}>
                <span className={styles.username}>{user}</span>
                <button className={styles.logoutButton} onClick={logout}>
                    Sair
                </button>
            </div>
        </aside>
    )
}