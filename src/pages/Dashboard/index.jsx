import { useAuth } from '../../context/AuthContext'
import Header from '../../components/Layout/Header'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.card}>
          <span className={styles.badge}>✓ Usuário autenticado</span>
          <h1>Bem-vindo, {user?.nome ?? user?.username}!</h1>
          <p>Perfil: <strong>{user?.perfil}</strong></p>
        </div>
      </main>
    </div>
  )
}
