import { useState } from 'react'
import { getRelatorio } from '../../../services/produtos'
import styles from './Tela.module.css'

export default function RelatorioModal({ produto, onClose }) {
    const [de, setDe] = useState('')
    const [ate, setAte] = useState('')
    const [relatorio, setRelatorio] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        if (!de || !ate) return setError('Preencha as duas datas')
        setLoading(true)
        setError('')
        const res = await getRelatorio(produto.id, new Date(de).toISOString(), new Date(ate).toISOString())
        setLoading(false)
        if (res.success) setRelatorio(res.data)
        else setError(typeof res.error === 'string' ? res.error : JSON.stringify(res.error))
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <button className={styles.btnFechar} onClick={onClose}>✕</button>
                <h2 className={styles.titulo}>Relatório de Movimentações</h2>
                <p className={styles.subtitulo}>{produto.nome}</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <label>De
                        <input type="datetime-local" value={de} onChange={e => { setDe(e.target.value); setError('') }} />
                    </label>
                    <label>Até
                        <input type="datetime-local" value={ate} onChange={e => { setAte(e.target.value); setError('') }} />
                    </label>
                    {error && <span className={styles.erro}>{error}</span>}
                    <div className={styles.acoes}>
                        <button type="submit" className={styles.btnConfirmar} disabled={loading}>
                            {loading ? 'Buscando...' : 'Buscar'}
                        </button>
                    </div>
                </form>

                {relatorio && (
                    <div className={styles.relatorio}>
                        <p><strong>Total entradas:</strong> {relatorio.totalEntradas}</p>
                        <p><strong>Total saídas:</strong> {relatorio.totalSaidas}</p>
                        <p><strong>Saldo no período:</strong> {relatorio.saldoPeriodo}</p>
                        {relatorio.movimentacoes?.length > 0 ? (
                            <table className={styles.tabelaRelatorio}>
                                <thead>
                                    <tr><th>Tipo</th><th>Qtd</th><th>Data</th></tr>
                                </thead>
                                <tbody>
                                    {relatorio.movimentacoes.map((m, i) => (
                                        <tr key={i}>
                                            <td>{m.tipo}</td>
                                            <td>{m.quantidade}</td>
                                            <td>{new Date(m.dataHora).toLocaleString('pt-BR')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Nenhuma movimentação no período.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
