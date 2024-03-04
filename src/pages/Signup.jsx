import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Signup = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [datosUser, setDatosUser] = useState({ username: '', password: '', favorites: [] })
  const [errorUsername, setErrorUsername] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorMensaje, setErrorMensaje] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setDatosUser((prevDatos) => ({ ...prevDatos, [name]: value }))
  }

  const handleBlur = (e) => {
    const { name, value } = e.target

    //se valida que el username y la contraseña tengan 4 caracteres o más
    if (name === 'username' && value.length < 4) {
      setErrorUsername('Username must be at least 4 characters')
    } else if (name === 'password' && value.length < 4) {
      setErrorPassword('Password must be at least 4 characters')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setErrorUsername('')
    setErrorPassword('')
    setErrorMensaje('')

    if (datosUser.username.length < 4) {
      setErrorUsername('Username must be at least 4 characters')
      return
    }

    if (datosUser.password.length < 4) {
      setErrorPassword('Password must be at least 4 characters')
      return
    }

    if (localStorage.getItem(datosUser.username)) {
      setErrorMensaje('Username already exists')
      return
    }

    //si se ha registrado sin problemas se crea el user en el LS y en el estado global se establecen sus datos además de loggearlo
    const nuevoUser = { ...datosUser, favorites: [] }
    localStorage.setItem(nuevoUser.username, JSON.stringify(nuevoUser))
    setUser({ loggedIn: true, username: nuevoUser.username })
    navigate('/shop')
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <label htmlFor="user_signup">Username:</label>
      <input
        type="text"
        id="user_signup"
        name="username"
        placeholder="example123"
        value={datosUser.username}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      <p className='error-signup'>{errorUsername}</p>

      <label htmlFor="password_signup">Password:</label>
      <input
        type="password"
        id="password_signup"
        name="password"
        placeholder="Enter your password"
        value={datosUser.password}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      <p className='error-signup'>{errorPassword}</p>

      <button className='button_form button_form_signup' type="submit">
        Sign up
      </button>

      <p className='error-signup'>{errorMensaje}</p>
    </form>
  )
}

export default Signup;
