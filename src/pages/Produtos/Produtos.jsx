import { useEffect, useState, useCallback, useMemo } from 'react'
import { getProdutos, updateProduto, deleteProduto } from '../../services/produtos'
import { getCategorias } from '../../services/categorias'
import ProdutoForm from './components/ProdutoForm.jsx'
import ProdutoList from './components/ProdutoList.jsx'
import ProdutoFilters from './components/ProdutoFilters.jsx'
import MovimentacaoModal from './components/MovimentacaoModal.jsx'
import RelatorioModal from './components/RelatorioModal.jsx'
import Toast from '../../components/Toast.jsx'
import styles from './Produtos.module.css'

export default function Produtos() {
    const [produtos, setProdutos] = useState([])
    const [loading, setLoading] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [editandoId, setEditandoId] = useState(null)
    const [editForm, setEditForm] = useState({})
    const [categorias, setCategorias] = useState([])
    const [movimentandoProduto, setMovimentandoProduto] = useState(null)
    const [relatorioProduto, setRelatorioProduto] = useState(null)
    const [toast, setToast] = useState(null)
    const [filtro, setFiltro] = useState({ busca: '', ordenacao: '' })

    const produtosFiltrados = useMemo(() => {
        let lista = [...produtos]
        if (filtro.busca)
            lista = lista.filter(p => p.nome.toLowerCase().includes(filtro.busca.toLowerCase()))
        if (filtro.ordenacao === 'asc') lista.sort((a, b) => a.nome.localeCompare(b.nome))
        else if (filtro.ordenacao === 'desc') lista.sort((a, b) => b.nome.localeCompare(a.nome))
        else if (filtro.ordenacao === 'precoAsc') lista.sort((a, b) => a.preco - b.preco)
        else if (filtro.ordenacao === 'precoDesc') lista.sort((a, b) => b.preco - a.preco)
        return lista
    }, [produtos, filtro])

    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type })
    }, [])

    useEffect(() => {
        carregarProdutos()
        getCategorias().then(res => { if (res.success) setCategorias(res.data) })
    }, [])

    async function carregarProdutos() {
        setLoading(true)
        const res = await getProdutos()
        if (res.success) {
            setProdutos(res.data)
        } else {
            showToast(res.error || 'Erro ao carregar produtos', 'error')
        }
        setLoading(false)
    }

    function handleAddProduto(novoProduto) {
        carregarProdutos()
        setShowForm(false)
        showToast('Produto adicionado com sucesso!')
    }

    function handleMovimentacaoSuccess(produtoAtualizado) {
        setProdutos(prev => prev.map(p => p.id === produtoAtualizado.id ? produtoAtualizado : p))
        showToast('Estoque atualizado com sucesso!')
    }

    function iniciarEdicao(p) {
        setEditandoId(p.id)
        setEditForm({
            nome: p.nome,
            preco: p.preco,
            categoriaId: typeof p.categoria === 'object' ? p.categoria.id : p.categoriaId,
            dataValidade: p.dataValidade || ''
        })
    }

    async function salvarEdicao(id) {
        if (!editForm.nome?.trim()) {
            return showToast('Nome é obrigatório', 'error')
        }

        if (Number(editForm.preco) < 0) {
            return showToast('Preço não pode ser negativo', 'error')
        }

        if (!editForm.categoriaId) {
            return showToast('Selecione uma categoria', 'error')
        }

        if (!editForm.dataValidade) {
            return showToast('Data de validade é obrigatória', 'error')
        }

        const res = await updateProduto(id, {
            nome: editForm.nome.trim(),
            preco: Number(editForm.preco),
            categoriaId: Number(editForm.categoriaId),
            dataValidade: editForm.dataValidade
        })
        if (res.success) {
            setProdutos(prev => prev.map(p => p.id === id ? res.data : p))
            setEditandoId(null)
            showToast('Produto atualizado com sucesso!')
        } else {
            showToast(typeof res.error === 'string' ? res.error : JSON.stringify(res.error), 'error')
        }
    }

    async function excluirProduto(id) {
        if (!window.confirm('Excluir este produto?')) return
        const res = await deleteProduto(id)
        if (res.success) {
            setProdutos(prev => prev.filter(p => p.id !== id))
            showToast('Produto excluído com sucesso!')
        } else {
            showToast(typeof res.error === 'string' ? res.error : JSON.stringify(res.error), 'error')
        }
    }

    if (movimentandoProduto) {
        return (
            <>
                <MovimentacaoModal
                    produto={movimentandoProduto}
                    onClose={() => setMovimentandoProduto(null)}
                    onSuccess={handleMovimentacaoSuccess}
                />
                {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            </>
        )
    }

    if (relatorioProduto) {
        return (
            <>
                <RelatorioModal
                    produto={relatorioProduto}
                    onClose={() => setRelatorioProduto(null)}
                />
                {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            </>
        )
    }

    return (
        <div className={styles.page}>
            <h1>Produtos</h1>

            <div className={styles.topActions}>
                {!showForm && (
                    <button className={styles.btnAdicionar} onClick={() => setShowForm(true)}>
                        + Adicionar Produto
                    </button>
                )}
            </div>

            {!showForm && (
                <ProdutoFilters filtro={filtro} setFiltro={setFiltro} produtos={produtos} />
            )}

            {showForm ? (
                <ProdutoForm onAdd={handleAddProduto} onCancel={() => setShowForm(false)} />
            ) : (
                <div>
                    {loading && <div>Carregando...</div>}
                    {!loading && produtos.length === 0 && <div>Nenhum produto encontrado.</div>}

                    <ProdutoList
                        produtos={produtosFiltrados}
                        categorias={categorias}
                        onEdit={salvarEdicao}
                        onDelete={excluirProduto}
                        editandoId={editandoId}
                        editForm={editForm}
                        setEditForm={setEditForm}
                        onIniciarEdicao={iniciarEdicao}
                        onCancelarEdicao={() => setEditandoId(null)}
                        onMovimentar={setMovimentandoProduto}
                        onRelatorio={setRelatorioProduto}
                    />
                </div>
            )}

            {toast && (
                <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
            )}
        </div>
    )
}
