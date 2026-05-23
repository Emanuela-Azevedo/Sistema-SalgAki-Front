import styles from '../Produtos.module.css'

export default function ProdutoItem({ produto, categorias, onEdit, onDelete, editandoId, editForm, setEditForm, onIniciarEdicao, onCancelarEdicao }) {
    const editando = editandoId === produto.id
    const categoriaNome = typeof produto.categoria === 'object' ? produto.categoria?.nome : produto.categoriaNome ?? produto.categoria

    if (editando) {
        return (
            <tr>
                <td><input className={styles.editInput} value={editForm.nome} onChange={e => setEditForm(f => ({ ...f, nome: e.target.value }))} /></td>
                <td><input className={styles.editInput} type="number" step="0.01" value={editForm.preco} onChange={e => setEditForm(f => ({ ...f, preco: e.target.value }))} /></td>
                <td><input className={styles.editInput} type="number" value={editForm.quantidade} onChange={e => setEditForm(f => ({ ...f, quantidade: e.target.value }))} /></td>
                <td>
                    <select className={styles.editInput} value={editForm.categoriaId} onChange={e => setEditForm(f => ({ ...f, categoriaId: e.target.value }))}>
                        {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                    </select>
                </td>
                <td>
                    <div className={styles.actions}>
                        <button onClick={() => onEdit(produto.id)}>Salvar</button>
                        <button className={styles.btnCancelar} onClick={onCancelarEdicao}>Cancelar</button>
                    </div>
                </td>
            </tr>
        )
    }

    return (
        <tr>
            <td>{produto.nome}</td>
            <td>R$ {produto.preco}</td>
            <td>{produto.quantidade}</td>
            <td>{categoriaNome}</td>
            <td>
                <div className={styles.actions}>
                    <button className={styles.btnEditar} onClick={() => onIniciarEdicao(produto)}>Editar</button>
                    <button onClick={() => onDelete(produto.id)}>Excluir</button>
                </div>
            </td>
        </tr>
    )
}
