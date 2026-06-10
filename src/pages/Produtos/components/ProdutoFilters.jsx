import styles from '../Produtos.module.css'

export default function ProdutoFilters({ filtro, setFiltro }) {
    return (
        <div className={styles.filters}>
            <input
                className={styles.filterInput}
                placeholder="🔍 Buscar produto..."
                value={filtro.busca}
                onChange={e => setFiltro({ ...filtro, busca: e.target.value })}
            />
            <select
                className={styles.filterSelect}
                value={filtro.ordenacao}
                onChange={e => setFiltro({ ...filtro, ordenacao: e.target.value })}
            >
                <option value="">Ordenar por...</option>
                <option value="asc">A → Z</option>
                <option value="desc">Z → A</option>
                <option value="precoAsc">Menor preço</option>
                <option value="precoDesc">Maior preço</option>
            </select>
        </div>
    )
}