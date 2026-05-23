import { useState, useEffect } from 'react'
import { getCategorias } from '../../../services/categorias'
import { createProduto } from '../../../services/produtos'
import styles from '../Produtos.module.css'

export default function ProdutoForm({ onAdd, onCancel }) {
    const [nome, setNome] = useState('')
    const [categoriaId, setCategoriaId] = useState('')
    const [preco, setPreco] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [categorias, setCategorias] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        async function carregarCategorias() {
            const res = await getCategorias()
            if (res.success) {
                setCategorias(res.data)
            } else {
                setError(res.error || 'Erro ao carregar categorias')
            }
        }
        carregarCategorias()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')

        // validações básicas no front
        if (!nome.trim()) return setError('Nome é obrigatório')
        if (!preco) return setError('Preço é obrigatório')
        if (!quantidade && quantidade !== 0) return setError('Quantidade é obrigatória')
        if (!categoriaId) return setError('Selecione uma categoria')

        const payload = {
            nome: nome.trim(),
            preco: Number(preco),
            quantidade: Number(quantidade),
            categoriaId: Number(categoriaId)
        }

        const res = await createProduto(payload)
        if (res.success) {
            onAdd(res.data)
            setNome('')
            setPreco('')
            setQuantidade('')
            setCategoriaId('')
        } else {
            // res.error pode ser string ou objeto de erros de validação
            const msg = typeof res.error === 'string' ? res.error : JSON.stringify(res.error)
            setError(msg)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                placeholder="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
            />
            <input
                type="number"
                step="0.01"
                placeholder="Preço"
                value={preco}
                onChange={e => setPreco(e.target.value)}
            />
            <input
                type="number"
                step="1"
                min="0"
                placeholder="Quantidade"
                value={quantidade}
                onChange={e => setQuantidade(e.target.value)}
                style={{ minWidth: 'unset', width: '90px' }}
            />
            <select value={categoriaId} onChange={e => setCategoriaId(e.target.value)}>
                <option value="">Selecione a categoria</option>
                {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nome}</option>
                ))}
            </select>
            <button type="submit">Adicionar</button>
            <button type="button" className={styles.btnCancelar} onClick={onCancel}>Cancelar</button>
            {error && <span style={{ color: 'red' }}>{error}</span>}
        </form>
    )
}