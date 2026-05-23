import styles from '../categorias.module.css'

export default function CategoriaForm({ nova, setNova, onSubmit }) {
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <input
                placeholder="Nova categoria"
                value={nova}
                onChange={e => setNova(e.target.value)}
            />
            <button type="submit">Adicionar</button>
        </form>
    )
}
