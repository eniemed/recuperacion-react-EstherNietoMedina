import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const { setUser } = useContext(UserContext)
  const [datosForm, setDatosForm] = useState({
    user: '',
    password: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setDatosForm({ ...datosForm, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const usersGuardados = Object.entries(localStorage).map(([key, value]) => ({ key, ...JSON.parse(value) }))
    const usersEncontrados = usersGuardados.find((user) => user.username === datosForm.user && user.password === datosForm.password)

    if (usersEncontrados) {
      setUser({ loggedIn: true, username: usersEncontrados.username })
      navigate('/shop')
    } else {
      setError('Incorrect user or password')
    }
  }

  const handleBlur = () => {
    //se valida que el username tenga al menos 4 caracteres y la contraseña también
    if (datosForm.user.length < 4) {
      setError('Username must have at least 4 characters')
    } else if (datosForm.password.length < 4) {
      setError('Password must have at least 4 characters')
    } else {
      setError('')
    }
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <label htmlFor="user_login">Username:</label>
      <input
        type="text"
        id="user_login"
        name='user'
        placeholder="example123"
        value={datosForm.user}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />

      <label htmlFor="password_login">Password:</label>
      <input
        type="password"
        id="password_login"
        name="password"
        placeholder="Enter your password"
        value={datosForm.password}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />

      <p className='error-signup'>{error}</p>

      <button className='button_form button_form_login' type="submit">
        Log in
      </button>
    </form>
  )
}

export default Login;
