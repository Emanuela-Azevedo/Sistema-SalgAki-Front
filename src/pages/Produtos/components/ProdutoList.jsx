import ProdutoItem from './ProdutoItem'
import styles from '../Produtos.module.css'

export default function ProdutoList({ produtos, categorias, onEdit, onDelete, editandoId, editForm, setEditForm, onIniciarEdicao, onCancelarEdicao }) {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th style={{ textAlign: 'center' }}>Quantidade</th>
                    <th>Categoria</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {produtos.map(p => (
                    <ProdutoItem
                        key={p.id}
                        produto={p}
                        categorias={categorias}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        editandoId={editandoId}
                        editForm={editForm}
                        setEditForm={setEditForm}
                        onIniciarEdicao={onIniciarEdicao}
                        onCancelarEdicao={onCancelarEdicao}
                    />
                ))}
            </tbody>
        </table>
    )
}
