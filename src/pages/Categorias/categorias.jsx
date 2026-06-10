import { useState, useEffect, useCallback, useMemo } from 'react'
import { getCategorias, createCategoria, updateCategoria, deleteCategoria } from '../../services/categorias'
import CategoriaForm from './components/CategoriaForm'
import CategoriaList from './components/CategoriaList'
import Toast from '../../components/Toast.jsx'
import styles from './categorias.module.css'

export default function Categorias() {
    const [categorias, setCategorias] = useState([])
    const [nova, setNova] = useState('')
    const [editandoId, setEditandoId] = useState(null)
    const [editNome, setEditNome] = useState('')
    const [toast, setToast] = useState(null)
    const [filtro, setFiltro] = useState({ busca: '', ordenacao: '' })

    const categoriasFiltradas = useMemo(() => {
        let lista = [...categorias]
        if (filtro.busca) lista = lista.filter(c => c.nome.toLowerCase().includes(filtro.busca.toLowerCase()))
        if (filtro.ordenacao === 'asc') lista.sort((a, b) => a.nome.localeCompare(b.nome))
        else if (filtro.ordenacao === 'desc') lista.sort((a, b) => b.nome.localeCompare(a.nome))
        return lista
    }, [categorias, filtro])

    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type })
    }, [])

    useEffect(() => {
        getCategorias().then(res => {
            if (res.success) setCategorias(res.data)
            else showToast(res.error || 'Erro ao carregar categorias', 'error')
        })
    }, [])

    async function adicionarCategoria(e) {
        e.preventDefault()
        if (!nova.trim()) return showToast('Nome da categoria é obrigatório', 'error')
        const res = await createCategoria({ nome: nova })
        if (res.success) {
            setCategorias(prev => [...prev, res.data])
            setNova('')
            showToast('Categoria adicionada com sucesso!')
        } else {
            showToast(res.error, 'error')
        }
    }

    function iniciarEdicao(c) {
        setEditandoId(c.id)
        setEditNome(c.nome)
    }

    async function salvarEdicao(id) {
        if (!editNome.trim()) return showToast('Nome não pode ser vazio', 'error')
        const res = await updateCategoria(id, { nome: editNome })
        if (res.success) {
            setCategorias(prev => prev.map(c => c.id === id ? res.data : c))
            setEditandoId(null)
            showToast('Categoria atualizada com sucesso!')
        } else {
            showToast(res.error, 'error')
        }
    }

    async function excluirCategoria(id) {
        const res = await deleteCategoria(id)
        if (res.success) {
            setCategorias(prev => prev.filter(c => c.id !== id))
            showToast('Categoria excluída com sucesso!')
        } else {
            showToast(res.error, 'error')
        }
    }

    return (
        <div className={styles.page}>
            <h1>Categorias</h1>

            <CategoriaForm nova={nova} setNova={setNova} onSubmit={adicionarCategoria} />

            <div className={styles.filters}>
                <input
                    className={styles.filterInput}
                    placeholder="🔍 Buscar categoria..."
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
                </select>
            </div>

            <CategoriaList
                categorias={categoriasFiltradas}
                editandoId={editandoId}
                editNome={editNome}
                setEditNome={setEditNome}
                onIniciarEdicao={iniciarEdicao}
                onSalvar={salvarEdicao}
                onCancelar={() => setEditandoId(null)}
                onExcluir={excluirCategoria}
            />

            {toast && (
                <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
            )}
        </div>
    )
}
