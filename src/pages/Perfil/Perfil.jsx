import { useState, useEffect } from 'react'
import { getUsuario, atualizarSenha } from '../../services/usuario'
import Toast from '../../components/Toast.jsx'
import styles from './Perfil.module.css'

export default function Perfil() {
    const [username, setUsername] = useState('')
    const [form, setForm] = useState({ novaSenha: '', confirmarSenha: '' })
    const [erros, setErros] = useState({})
    const [toast, setToast] = useState(null)

    useEffect(() => {
        getUsuario().then(res => { if (res.success) setUsername(res.data.username) })
    }, [])

    function validar() {
        const e = {}
        if (!form.novaSenha) e.novaSenha = 'Nova senha é obrigatória'
        else if (form.novaSenha.length < 4) e.novaSenha = 'Mínimo 4 caracteres'
        if (form.confirmarSenha !== form.novaSenha) e.confirmarSenha = 'As senhas não coincidem'
        return e
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const e2 = validar()
        if (Object.keys(e2).length) return setErros(e2)

        const res = await atualizarSenha(form.novaSenha)
        if (res.success) {
            setForm({ novaSenha: '', confirmarSenha: '' })
            setToast({ message: 'Senha atualizada com sucesso!', type: 'success' })
        } else {
            setToast({ message: res.error, type: 'error' })
        }
    }

    function handleChange(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        setErros(prev => ({ ...prev, [name]: '' }))
    }

    return (
        <div className={styles.page}>
            <h1>Perfil</h1>
            <div className={styles.card}>
                <div className={styles.field}>
                    <span className={styles.label}>Usuário</span>
                    <span className={styles.value}>{username}</span>
                </div>

                <hr className={styles.divider} />

                <form onSubmit={handleSubmit} noValidate>
                    <p className={styles.label} style={{ marginBottom: '0.75rem' }}>Alterar Senha</p>

                    <div className={styles.field}>
                        <label className={styles.label}>Nova Senha</label>
                        <input
                            name="novaSenha"
                            type="password"
                            value={form.novaSenha}
                            onChange={handleChange}
                            className={erros.novaSenha ? styles.inputError : styles.input}
                        />
                        {erros.novaSenha && <span className={styles.fieldError}>{erros.novaSenha}</span>}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Confirmar Senha</label>
                        <input
                            name="confirmarSenha"
                            type="password"
                            value={form.confirmarSenha}
                            onChange={handleChange}
                            className={erros.confirmarSenha ? styles.inputError : styles.input}
                        />
                        {erros.confirmarSenha && <span className={styles.fieldError}>{erros.confirmarSenha}</span>}
                    </div>

                    <button type="submit" className={styles.btnSalvar}>Salvar</button>
                </form>
            </div>

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    )
}
