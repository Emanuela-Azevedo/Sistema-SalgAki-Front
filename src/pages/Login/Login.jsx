import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/authService.js'
import styles from './Login.module.css'
import logo from '../../assets/logo-SalgAki.png.png'


export default function Login() {
  const navigate = useNavigate()

  const [form, setForm] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  function validate() {
    const errs = {}
    if (!form.username.trim()) errs.username = 'Username obrigatório'
    if (!form.password.trim()) errs.password = 'Senha obrigatória'
    return errs
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setApiError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) return setErrors(errs)

    setLoading(true)
    const { success, error } = await login(form.username, form.password)
    setLoading(false)

    if (!success) return setApiError(error)

    navigate('/dashboard/home')
  }

  return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <img src={logo} alt="SalgAki" className={styles.logo} />

          <div className={styles.divider} />

          <h2 className={styles.loginTitle}>Login</h2>

          <div className={styles.field}>
            <label htmlFor="username">Username:</label>
            <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="seu usuário"
                autoComplete="username"
            />
            {errors.username && <span className={styles.error}>{errors.username}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Senha:</label>
            <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="current-password"
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>

          {apiError && <p className={styles.apiError}>{apiError}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
  )
}