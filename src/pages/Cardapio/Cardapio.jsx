import { useState } from 'react'
import { obterTextoCardapio } from '../../services/cardapio'
import Toast from '../../components/Toast.jsx'
import styles from './Cardapio.module.css'

export default function Cardapio() {
    const [numero, setNumero] = useState('')
    const [erro, setErro] = useState('')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)

    function aplicarMascara(valor) {
        const digits = valor.replace(/\D/g, '').slice(0, 13)

        if (digits.length <= 2) return '+' + digits
        if (digits.length <= 4) return `+${digits.slice(0, 2)} (${digits.slice(2)}`
        if (digits.length <= 9) return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4)}`
        return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (!numero.trim()) {
            setErro('Número é obrigatório')
            return
        }

        const apenasDigitos = numero.replace(/\D/g, '')

        if (apenasDigitos.length < 12) {
            setErro('Número incompleto')
            return
        }

        setErro('')
        setLoading(true)

        try {
            const { success, texto, error } = await obterTextoCardapio()

            if (!success) {
                setErro(error)
                return
            }

            const waUrl =
                `https://wa.me/${apenasDigitos}?text=${encodeURIComponent(texto)}`

            window.open(waUrl, '_blank')

            setToast({
                type: 'success',
                message: 'WhatsApp aberto com sucesso!'
            })

        } catch (err) {
            setErro('Erro ao enviar o cardápio')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.page}>
            <h1>Cardápio</h1>

            <div className={styles.card}>
                <div className={styles.icon}>📲</div>

                <h2 className={styles.titulo}>
                    Enviar Cardápio por WhatsApp
                </h2>

                <p className={styles.descricao}>
                    Informe o número do cliente para enviar o cardápio em formato de texto.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className={styles.form}
                    noValidate
                >
                    <div className={styles.field}>
                        <label className={styles.label}>
                            Número do WhatsApp
                        </label>

                        <input
                            type="tel"
                            placeholder="+55 (11) 99999-9999"
                            value={numero}
                            onChange={(e) => {
                                setNumero(aplicarMascara(e.target.value))
                                setErro('')
                            }}
                            className={erro ? styles.inputError : styles.input}
                        />

                        {erro && (
                            <span className={styles.erro}>
                                {erro}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={styles.btn}
                        disabled={loading}
                    >
                        {loading ? 'Enviando...' : '📤 Enviar Cardápio'}
                    </button>
                </form>
            </div>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    )
}