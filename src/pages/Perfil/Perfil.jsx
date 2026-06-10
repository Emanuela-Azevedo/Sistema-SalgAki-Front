import { useAuth } from '../../context/AuthContext'
import styles from './Perfil.module.css'

export default function Perfil() {
    const { user } = useAuth()

    return (
        <div className={styles.page}>
            <h1>Perfil</h1>
            <div className={styles.card}>
                <div className={styles.field}>
                    <span className={styles.label}>Usuário</span>
                    <span className={styles.value}>{user?.nome ?? user?.username}</span>
                </div>
            </div>
        </div>
    )
}
