import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [datosForm, setDatosForm] = useState({ email: '', mensaje: '' })
  const [errores, setErrores] = useState({ email: '', mensaje: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setDatosForm((prevDatos) => ({ ...prevDatos, [name]: value }))
  }

  //se va a validar el email con esta expresion regular
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  const validarEmail = () => {
    if (!emailRegex.test(datosForm.email)) {
      setErrores((prevErrores) => ({ ...prevErrores, email: 'Invalid email' }))
    } else {
      setErrores((prevErrores) => ({ ...prevErrores, email: '' }))
    }
  }

  //el mensaje no puede estar vacio
  const validarMensaje = () => {
    if (datosForm.mensaje.trim() === '') {
      setErrores((prevErrores) => ({ ...prevErrores, mensaje: 'Please write a message' }))
    } else {
      setErrores((prevErrores) => ({ ...prevErrores, mensaje: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    validarEmail()
    validarMensaje()

    //si hay alguna validación da error no se envia el form
    if (Object.values(errores).some((error) => error !== '')) {
      return
    }

    //si no hay errores se limpian los mensajes de error y manda al user a la pag principal
    setErrores({ email: '', mensaje: '' })
    navigate('/')
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="user_login"
        name="email"
        placeholder="example@example.com"
        value={datosForm.email}
        onChange={handleChange}
        onBlur={validarEmail}
        required
      />
      <p className='error-signup'>{errores.email}</p>

      <label htmlFor="mensaje">Tell us about it!</label>
      <textarea
        id="user_login"
        name="mensaje"
        placeholder="Write here..."
        value={datosForm.mensaje}
        onChange={handleChange}
        onBlur={validarMensaje}
        required
      ></textarea>
      <p className='error-signup'>{errores.mensaje}</p>

      <button className='button_form button_form_signup' type="submit">
        Send
      </button>
    </form>
  )
}

export default Contact;
