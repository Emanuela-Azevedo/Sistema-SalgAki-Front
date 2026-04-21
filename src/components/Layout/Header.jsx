import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import logo from '../../assets/logo-SalgAki.png.png'

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className={styles.header}>
      <img src={logo} alt="SalgAki" className={styles.logo} />
      <div className={styles.right}>
        <span className={styles.user}>Olá, {user?.nome ?? user?.username}</span>
        <button onClick={handleLogout}>Sair</button>
      </div>
    </header>
  )
}
