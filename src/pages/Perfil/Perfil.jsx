import { useState, useEffect } from 'react'
import { getUsuario, atualizarSenha, atualizarUsername } from '../../services/usuario'
import Toast from '../../components/Toast.jsx'
import styles from './Perfil.module.css'

export default function Perfil() {
    const [username, setUsername] = useState('')
    const [modo, setModo] = useState(null) // null | 'usuario' | 'senha'
    const [form, setForm] = useState({})
    const [erros, setErros] = useState({})
    const [toast, setToast] = useState(null)

    useEffect(() => {
        getUsuario().then(res => { if (res.success) setUsername(res.data.username) })
    }, [])

    function handleChange(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        setErros(prev => ({ ...prev, [name]: '' }))
    }

    function abrirModo(m) {
        setModo(m)
        setForm({})
        setErros({})
    }

    function cancelar() {
        setModo(null)
        setForm({})
        setErros({})
    }

    async function handleSubmitUsuario(e) {
        e.preventDefault()
        if (!form.novoUsername?.trim()) return setErros({ novoUsername: 'Usuário é obrigatório' })

        const res = await atualizarUsername(form.novoUsername.trim())
        if (res.success) {
            setUsername(res.data.username)
            cancelar()
            setToast({ message: 'Usuário atualizado com sucesso!', type: 'success' })
        } else {
            setToast({ message: res.error, type: 'error' })
        }
    }

    async function handleSubmitSenha(e) {
        e.preventDefault()
        const e2 = {}
        if (!form.novaSenha) e2.novaSenha = 'Nova senha é obrigatória'
        else if (form.novaSenha.length < 4) e2.novaSenha = 'Mínimo 4 caracteres'
        if (form.confirmarSenha !== form.novaSenha) e2.confirmarSenha = 'As senhas não coincidem'
        if (Object.keys(e2).length) return setErros(e2)

        const res = await atualizarSenha(form.novaSenha)
        if (res.success) {
            cancelar()
            setToast({ message: 'Senha atualizada com sucesso!', type: 'success' })
        } else {
            setToast({ message: res.error, type: 'error' })
        }
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

                {!modo && (
                    <div className={styles.botoes}>
                        <button className={styles.btnAlterar} onClick={() => abrirModo('usuario')}>Alterar Usuário</button>
                        <button className={styles.btnAlterar} onClick={() => abrirModo('senha')}>Alterar Senha</button>
                    </div>
                )}

                {modo === 'usuario' && (
                    <form onSubmit={handleSubmitUsuario} noValidate className={styles.formAlterar}>
                        <p className={styles.tituloForm}>Alterar Usuário</p>
                        <div className={styles.field}>
                            <label className={styles.label}>Novo Usuário</label>
                            <input
                                name="novoUsername"
                                type="text"
                                value={form.novoUsername || ''}
                                onChange={handleChange}
                                className={erros.novoUsername ? styles.inputError : styles.input}
                            />
                            {erros.novoUsername && <span className={styles.fieldError}>{erros.novoUsername}</span>}
                        </div>
                        <div className={styles.acoes}>
                            <button type="submit" className={styles.btnSalvar}>Salvar</button>
                            <button type="button" className={styles.btnCancelar} onClick={cancelar}>Cancelar</button>
                        </div>
                    </form>
                )}

                {modo === 'senha' && (
                    <form onSubmit={handleSubmitSenha} noValidate className={styles.formAlterar}>
                        <p className={styles.tituloForm}>Alterar Senha</p>
                        <div className={styles.field}>
                            <label className={styles.label}>Nova Senha</label>
                            <input
                                name="novaSenha"
                                type="password"
                                value={form.novaSenha || ''}
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
                                value={form.confirmarSenha || ''}
                                onChange={handleChange}
                                className={erros.confirmarSenha ? styles.inputError : styles.input}
                            />
                            {erros.confirmarSenha && <span className={styles.fieldError}>{erros.confirmarSenha}</span>}
                        </div>
                        <div className={styles.acoes}>
                            <button type="submit" className={styles.btnSalvar}>Salvar</button>
                            <button type="button" className={styles.btnCancelar} onClick={cancelar}>Cancelar</button>
                        </div>
                    </form>
                )}
            </div>

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    )
}
