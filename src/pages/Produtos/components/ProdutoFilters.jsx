export default function ProdutoFilters({ filtro, setFiltro, produtos }) {
    // Extrair categorias únicas dos produtos cadastrados
    const categorias = [...new Set(produtos.map(p => p.categoria.trim()))]

    // Se não houver categorias no banco, mostrar opções padrão
    const categoriasFinal = categorias.length
        ? categorias
        : ['Salgados', 'Bebidas', 'Doces']

    function handleBusca(e) {
        setFiltro({ ...filtro, busca: e.target.value })
    }

    function handleCategoria(e) {
        setFiltro({ ...filtro, categoria: e.target.value })
    }

    function handleOrdenacao(e) {
        const valor = e.target.value
        const opcoesValidas = ["", "asc", "desc", "precoAsc", "precoDesc"]
        if (opcoesValidas.includes(valor)) {
            setFiltro({ ...filtro, ordenacao: valor })
        }
    }

    return (
        <div className="filters">
            <input
                placeholder="Buscar por nome"
                value={filtro.busca}
                onChange={handleBusca}
            />

            <select value={filtro.categoria} onChange={handleCategoria}>
                <option value="">Todas categorias</option>
                {categoriasFinal.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            <select value={filtro.ordenacao} onChange={handleOrdenacao}>
                <option value="">Ordenar</option>
                <option value="asc">A → Z</option>
                <option value="desc">Z → A</option>
                <option value="precoAsc">Menor preço</option>
                <option value="precoDesc">Maior preço</option>
            </select>
        </div>
    )
}