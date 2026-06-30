import { useState } from 'react'
import { getRelatorioMovimentacoes, getDetalhesMovimentacoes } from '../../../services/movimentacaoEstoque'
import styles from './Tela.module.css'

export default function RelatorioModal({ produto, onClose }) {
    const [de, setDe] = useState('')
    const [ate, setAte] = useState('')
    const [relatorio, setRelatorio] = useState(null)
    const [detalhes, setDetalhes] = useState(null)
    const [modo, setModo] = useState('resumo') // 'resumo' | 'detalhes'
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        if (!de || !ate) return setError('Preencha as duas datas')
        setLoading(true)
        setError('')
        setRelatorio(null)
        setDetalhes(null)

        if (modo === 'resumo') {
            const res = await getRelatorioMovimentacoes(produto.id, `${de}T00:00:00`, `${ate}T23:59:59`)
            if (res.success) {
                console.log('RESUMO:', res.data)
                setRelatorio(res.data)
            }
            else setError(typeof res.error === 'string' ? res.error : JSON.stringify(res.error))
        } else {
            const res = await getDetalhesMovimentacoes(produto.id, `${de}T00:00:00`, `${ate}T23:59:59`)
            if (res.success) {
                console.log('DETALHES:', res.data)
                setDetalhes(res.data)
            }
            else setError(typeof res.error === 'string' ? res.error : JSON.stringify(res.error))
        }

        setLoading(false)
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <button className={styles.btnFechar} onClick={onClose}>✕</button>
                <h2 className={styles.titulo}>Relatório de Movimentações</h2>
                <p className={styles.subtitulo}>{produto.nome}</p>

                <div className={styles.modoBtn}>
                    <button
                        type="button"
                        className={modo === 'resumo' ? styles.btnConfirmar : styles.btnSecundario}
                        onClick={() => { setModo('resumo'); setRelatorio(null); setDetalhes(null) }}
                    >
                        Resumo
                    </button>
                    <button
                        type="button"
                        className={modo === 'detalhes' ? styles.btnConfirmar : styles.btnSecundario}
                        onClick={() => { setModo('detalhes'); setRelatorio(null); setDetalhes(null) }}
                    >
                        Detalhado
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <label>De
                        <input type="date" value={de} onChange={e => { setDe(e.target.value); setError('') }} />
                    </label>
                    <label>Até
                        <input type="date" value={ate} onChange={e => { setAte(e.target.value); setError('') }} />
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
                                            <td>{new Date(m.dataHora).toLocaleDateString('pt-BR')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Nenhuma movimentação no período.</p>
                        )}
                    </div>
                )}

                {detalhes && (
                    <div className={styles.relatorio}>
                        {detalhes.length > 0 ? (
                            <table className={styles.tabelaRelatorio}>
                                <thead>
                                    <tr>
                                        <th>ID Estoque</th>
                                        <th>Tipo</th>
                                        <th>Qtd</th>
                                        <th>Data</th>
                                        <th>Validade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detalhes.map((m, i) => (
                                        <tr key={i}>
                                            <td>{m.estoqueId ?? '-'}</td>
                                            <td>{m.tipo}</td>
                                            <td>{m.quantidade}</td>
                                            <td>{new Date(m.dataHora).toLocaleDateString('pt-BR')}</td>
                                            <td>{m.dataValidade ? new Date(`${m.dataValidade}T00:00:00`).toLocaleDateString('pt-BR') : '-'}</td>
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
