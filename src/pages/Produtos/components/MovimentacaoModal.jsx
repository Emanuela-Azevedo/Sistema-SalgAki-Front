import { useState } from 'react'
import { movimentarEstoque } from '../../../services/produtos'
import styles from './Tela.module.css'

export default function MovimentacaoModal({ produto, onClose, onSuccess }) {
    const [tipo, setTipo] = useState('ENTRADA')
    const [quantidade, setQuantidade] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        if (!quantidade) return setError('Quantidade é obrigatória')
        if (Number(quantidade) <= 0) return setError('Quantidade deve ser maior que zero')

        setLoading(true)
        const res = await movimentarEstoque(produto.id, tipo, Number(quantidade))
        setLoading(false)

        if (res.success) {
            onSuccess(res.data)
            onClose()
        } else {
            setError(typeof res.error === 'string' ? res.error : JSON.stringify(res.error))
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <button className={styles.btnFechar} onClick={onClose}>✕</button>
                <h2 className={styles.titulo}>Movimentar Estoque</h2>
                <p className={styles.subtitulo}>{produto.nome}</p>

                {produto.quantidade <= 5 && (
                    <p className={styles.alerta}>⚠️ Estoque baixo — saldo atual: {produto.quantidade}</p>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <label>Tipo
                        <select value={tipo} onChange={e => { setTipo(e.target.value); setError('') }}>
                            <option value="ENTRADA">Entrada</option>
                            <option value="SAIDA">Saída</option>
                        </select>
                    </label>
                    <label>Quantidade
                        <input
                            type="number"
                            min="1"
                            placeholder="Ex: 10"
                            value={quantidade}
                            onChange={e => { setQuantidade(e.target.value); setError('') }}
                            className={error ? styles.inputError : ''}
                        />
                    </label>
                    {error && <span className={styles.erro}>{error}</span>}
                    <div className={styles.acoes}>
                        <button type="submit" className={styles.btnConfirmar} disabled={loading}>
                            {loading ? 'Salvando...' : 'Confirmar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
