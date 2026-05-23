import styles from '../categorias.module.css'

export default function CategoriaItem({ categoria, editandoId, editNome, setEditNome, onIniciarEdicao, onSalvar, onCancelar, onExcluir }) {
    const editando = editandoId === categoria.id

    return (
        <li>
            {editando ? (
                <>
                    <input
                        className={styles.editInput}
                        value={editNome}
                        onChange={e => setEditNome(e.target.value)}
                    />
                    <div className={styles.actions}>
                        <button onClick={() => onSalvar(categoria.id)}>Salvar</button>
                        <button className={styles.btnCancelar} onClick={onCancelar}>Cancelar</button>
                    </div>
                </>
            ) : (
                <>
                    <span>{categoria.nome}</span>
                    <div className={styles.actions}>
                        <button className={styles.btnEditar} onClick={() => onIniciarEdicao(categoria)}>Editar</button>
                        <button onClick={() => onExcluir(categoria.id)}>Excluir</button>
                    </div>
                </>
            )}
        </li>
    )
}
