import { useState, useEffect } from 'react'
import { getCategorias } from '../../../services/categorias'
import { createProduto } from '../../../services/produtos'
import styles from '../Produtos.module.css'

export default function ProdutoForm({ onAdd, onCancel }) {
    const [form, setForm] = useState({ nome: '', preco: '', categoriaId: '' })
    const [erros, setErros] = useState({})
    const [categorias, setCategorias] = useState([])
    const [apiError, setApiError] = useState('')

    useEffect(() => {
        getCategorias().then(res => {
            if (res.success) setCategorias(res.data)
            else setApiError(res.error || 'Erro ao carregar categorias')
        })
    }, [])

    function validar() {
        const e = {}
        if (!form.nome.trim()) e.nome = 'Nome é obrigatório'
        if (!form.preco) e.preco = 'Preço é obrigatório'
        else if (Number(form.preco) < 0) e.preco = 'Preço não pode ser negativo'
        if (!form.categoriaId) e.categoriaId = 'Selecione uma categoria'
        return e
    }

    function handleChange(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        setErros(prev => ({ ...prev, [name]: '' }))
        setApiError('')
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const e2 = validar()
        if (Object.keys(e2).length) return setErros(e2)

        const res = await createProduto({
            nome: form.nome.trim(),
            preco: Number(form.preco),
            categoriaId: Number(form.categoriaId)
        })

        if (res.success) {
            onAdd(res.data)
        } else {
            const errMsg = typeof res.error === 'string' ? res.error : JSON.stringify(res.error)
            setApiError(errMsg)
        }
    }

    return (
        <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
            <div className={styles.formField}>
                <input
                    name="nome"
                    placeholder="Nome"
                    value={form.nome}
                    onChange={handleChange}
                    className={erros.nome ? styles.inputError : ''}
                />
                {erros.nome && <span className={styles.fieldError}>{erros.nome}</span>}
            </div>

            <div className={styles.formField}>
                <input
                    name="preco"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Preço"
                    value={form.preco}
                    onChange={handleChange}
                    className={erros.preco ? styles.inputError : ''}
                />
                {erros.preco && <span className={styles.fieldError}>{erros.preco}</span>}
            </div>

            <div className={styles.formField}>
                <select
                    name="categoriaId"
                    value={form.categoriaId}
                    onChange={handleChange}
                    className={erros.categoriaId ? styles.inputError : ''}
                >
                    <option value="">Selecione a categoria</option>
                    {categorias.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.nome}</option>
                    ))}
                </select>
                {erros.categoriaId && <span className={styles.fieldError}>{erros.categoriaId}</span>}
            </div>

            <div className={styles.formActions}>
                <button type="submit">Adicionar</button>
                <button type="button" className={styles.btnCancelar} onClick={onCancel}>Cancelar</button>
            </div>

            <span className={styles.fieldInfo}>💡 A data de validade é definida ao movimentar o estoque.</span>

            {apiError && <span className={styles.fieldError}>{apiError}</span>}
        </form>
    )
}