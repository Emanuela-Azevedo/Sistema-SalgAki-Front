import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Sidebar.module.css'
import logo from '../../assets/logo-SalgAki.png.png'

export default function Sidebar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [aberta, setAberta] = useState(false)

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <aside className={`${styles.sidebar} ${aberta ? styles.aberta : ''}`}>
            <button className={styles.btnToggle} onClick={() => setAberta(a => !a)}>
                {aberta ? '◀' : '▶'}
            </button>

            <img src={logo} alt="SalgAki" className={styles.logo} />

            <nav className={styles.nav}>
                <Link to="/dashboard/perfil"><span className={styles.label}>Perfil</span></Link>
                <Link to="/dashboard/produtos"><span className={styles.label}>Produtos</span></Link>
                <Link to="/dashboard/categorias"><span className={styles.label}>Categorias</span></Link>
                <Link to="/dashboard/cardapio"><span className={styles.label}>Cardápio</span></Link>
            </nav>

            <div className={styles.footer}>
                <span className={styles.username}>{user?.nome ?? user?.username}</span>
                <button className={styles.logoutButton} onClick={handleLogout}><span className={styles.label}>Sair</span></button>
            </div>
        </aside>
    )
}