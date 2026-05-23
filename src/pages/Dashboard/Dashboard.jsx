import Sidebar from '../../components/Layout/Sidebar'
import styles from './Dashboard.module.css'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
    return (
        <div className={styles.page}>
            <Sidebar />

            <main className={styles.main}>
                {/* O Outlet renderiza o conteúdo da rota filha (ex: Produtos, Menu etc.) */}
                <Outlet />
            </main>
        </div>
    )
}