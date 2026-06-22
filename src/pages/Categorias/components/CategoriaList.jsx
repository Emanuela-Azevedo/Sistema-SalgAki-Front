import CategoriaItem from './CategoriaItem'
import styles from '../categorias.module.css'

export default function CategoriaList({ categorias, editandoId, editNome, setEditNome, onIniciarEdicao, onSalvar, onCancelar, onExcluir }) {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {categorias.map(c => (
                    <CategoriaItem
                        key={c.id}
                        categoria={c}
                        editandoId={editandoId}
                        editNome={editNome}
                        setEditNome={setEditNome}
                        onIniciarEdicao={onIniciarEdicao}
                        onSalvar={onSalvar}
                        onCancelar={onCancelar}
                        onExcluir={onExcluir}
                    />
                ))}
            </tbody>
        </table>
    )
}
