import { useState, useEffect } from 'react'
import { getCategorias, createCategoria, updateCategoria, deleteCategoria } from '../../services/categorias'
import CategoriaForm from './components/CategoriaForm'
import CategoriaList from './components/CategoriaList'
import styles from './categorias.module.css'

export default function Categorias() {
    const [categorias, setCategorias] = useState([])
    const [nova, setNova] = useState('')
    const [editandoId, setEditandoId] = useState(null)
    const [editNome, setEditNome] = useState('')

    useEffect(() => {
        async function carregar() {
            const res = await getCategorias()
            if (res.success) setCategorias(res.data)
        }
        carregar()
    }, [])

    async function adicionarCategoria(e) {
        e.preventDefault()
        if (!nova.trim()) return
        const res = await createCategoria({ nome: nova })
        if (res.success) {
            setCategorias(prev => [...prev, res.data])
            setNova('')
        } else {
            alert(res.error)
        }
    }

    function iniciarEdicao(c) {
        setEditandoId(c.id)
        setEditNome(c.nome)
    }

    async function salvarEdicao(id) {
        if (!editNome.trim()) return
        const res = await updateCategoria(id, { nome: editNome })
        if (res.success) {
            setCategorias(prev => prev.map(c => c.id === id ? res.data : c))
            setEditandoId(null)
        } else {
            alert(res.error)
        }
    }

    async function excluirCategoria(id) {
        const res = await deleteCategoria(id)
        if (res.success) {
            setCategorias(prev => prev.filter(c => c.id !== id))
        } else {
            alert(res.error)
        }
    }

    return (
        <div className={styles.page}>
            <h1>Categorias</h1>

            <CategoriaForm nova={nova} setNova={setNova} onSubmit={adicionarCategoria} />

            <CategoriaList
                categorias={categorias}
                editandoId={editandoId}
                editNome={editNome}
                setEditNome={setEditNome}
                onIniciarEdicao={iniciarEdicao}
                onSalvar={salvarEdicao}
                onCancelar={() => setEditandoId(null)}
                onExcluir={excluirCategoria}
            />
        </div>
    )
}
