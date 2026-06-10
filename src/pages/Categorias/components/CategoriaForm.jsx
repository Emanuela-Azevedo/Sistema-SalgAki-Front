import styles from '../categorias.module.css'

export default function CategoriaForm({ nova, setNova, onSubmit }) {
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <input
                className={styles.filterInput}
                placeholder="Nova categoria..."
                value={nova}
                onChange={e => setNova(e.target.value)}
            />
            <button type="submit" className={styles.formBtn}>Adicionar</button>
        </form>
    )
}
