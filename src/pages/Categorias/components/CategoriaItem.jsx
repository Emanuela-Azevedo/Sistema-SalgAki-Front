import styles from '../categorias.module.css'

export default function CategoriaItem({ categoria, editandoId, editNome, setEditNome, onIniciarEdicao, onSalvar, onCancelar, onExcluir }) {
    const editando = editandoId === categoria.id

    return (
        <tr>
            {editando ? (
                <>
                    <td><input className={styles.editInput} value={editNome} onChange={e => setEditNome(e.target.value)} /></td>
                    <td>
                        <div className={styles.actions}>
                            <button onClick={() => onSalvar(categoria.id)}>Salvar</button>
                            <button className={styles.btnCancelar} onClick={onCancelar}>Cancelar</button>
                        </div>
                    </td>
                </>
            ) : (
                <>
                    <td>{categoria.nome}</td>
                    <td>
                        <div className={styles.actions}>
                            <button className={styles.btnEditar} onClick={() => onIniciarEdicao(categoria)} title="Editar">✏️</button>
                            <button onClick={() => onExcluir(categoria.id)} title="Excluir">🗑️</button>
                        </div>
                    </td>
                </>
            )}
        </tr>
    )
}
