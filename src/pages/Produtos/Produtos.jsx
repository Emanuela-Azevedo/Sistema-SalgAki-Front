import { useEffect, useState } from 'react'
import { getProdutos, updateProduto, deleteProduto } from '../../services/produtos'
import { getCategorias } from '../../services/categorias'
import ProdutoForm from './components/ProdutoForm.jsx'
import ProdutoList from './components/ProdutoList.jsx'
import styles from './Produtos.module.css'

export default function Produtos() {
    const [produtos, setProdutos] = useState([])
    const [loading, setLoading] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [error, setError] = useState('')
    const [editandoId, setEditandoId] = useState(null)
    const [editForm, setEditForm] = useState({})
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        carregarProdutos()
        getCategorias().then(res => { if (res.success) setCategorias(res.data) })
    }, [])

    async function carregarProdutos() {
        setLoading(true)
        setError('')
        const res = await getProdutos()
        if (res.success) {
            setProdutos(res.data)
        } else {
            setError(res.error || 'Erro ao carregar produtos')
        }
        setLoading(false)
    }

    function handleAddProduto(novoProduto) {
        setProdutos(prev => [novoProduto, ...prev])
        setShowForm(false)
    }

    function iniciarEdicao(p) {
        setEditandoId(p.id)
        setEditForm({
            nome: p.nome,
            preco: p.preco,
            quantidade: p.quantidade,
            categoriaId: typeof p.categoria === 'object' ? p.categoria.id : p.categoriaId
        })
    }

    async function salvarEdicao(id) {
        const res = await updateProduto(id, {
            nome: editForm.nome,
            preco: Number(editForm.preco),
            quantidade: Number(editForm.quantidade),
            categoriaId: Number(editForm.categoriaId)
        })
        if (res.success) {
            setProdutos(prev => prev.map(p => p.id === id ? res.data : p))
            setEditandoId(null)
        } else {
            setError(typeof res.error === 'string' ? res.error : JSON.stringify(res.error))
        }
    }

    async function excluirProduto(id) {
        if (!window.confirm('Excluir este produto?')) return
        const res = await deleteProduto(id)
        if (res.success) {
            setProdutos(prev => prev.filter(p => p.id !== id))
        } else {
            setError(typeof res.error === 'string' ? res.error : JSON.stringify(res.error))
        }
    }

    return (
        <div className={styles.page}>
            <h1>Produtos</h1>

            {!showForm && (
                <button className={styles.btnAdicionar} onClick={() => setShowForm(true)}>
                    Adicionar Produto
                </button>
            )}

            {showForm ? (
                <ProdutoForm onAdd={handleAddProduto} onCancel={() => setShowForm(false)} />
            ) : (
                <div>
                    {loading && <div>Carregando...</div>}
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    {!loading && produtos.length === 0 && <div>Nenhum produto encontrado.</div>}

                    <ProdutoList
                        produtos={produtos}
                        categorias={categorias}
                        onEdit={salvarEdicao}
                        onDelete={excluirProduto}
                        editandoId={editandoId}
                        editForm={editForm}
                        setEditForm={setEditForm}
                        onIniciarEdicao={iniciarEdicao}
                        onCancelarEdicao={() => setEditandoId(null)}
                    />
                </div>
            )}
        </div>
    )
}
