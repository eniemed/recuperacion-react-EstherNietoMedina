import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { user, setUser } = useContext(UserContext)
  const [datosForm, setDatosForm] = useState({ gender: 'Male', phoneNumber: '', birthDate: '' })
  const [mensajeError, setMensajeError] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)
  const [showUserDetails, setShowUserDetails] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setDatosForm((prevDatos) => ({ ...prevDatos, [name]: value }))
  }

  //valida el num de telf con una expresion regular
  const validatePhoneNumber = () => {
    const phoneRegex = /^[678]\d{8}$/
    return phoneRegex.test(datosForm.phoneNumber)
  }

  //establece los errores o da visto bueno si las validaciones se cumplen
  const handleBlur = (field) => {
    if (field === 'phoneNumber') {
      if (!validatePhoneNumber()) {
        setMensajeError('Invalid phone number')
        setIsFormValid(false)
      } else {
        setMensajeError('')
        setIsFormValid(true)
      }
    } else if (field === 'birthDate') {
      if (datosForm.birthDate === '') {
        setMensajeError('Birth date cannot be empty')
        setIsFormValid(false)
      } else {
        setMensajeError('')
        setIsFormValid(true)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setMensajeError('')

    if (!validatePhoneNumber() || datosForm.birthDate === '') {
      setMensajeError('Please fill in all required fields correctly')
      setIsFormValid(false)
      return
    }

    //recoge los datos del user del LS y hace una copia con los datos nuevos
    const storedUser = JSON.parse(localStorage.getItem(user.username))
    const updatedUser = {
      ...storedUser,
      phoneNumber: datosForm.phoneNumber,
      birthDate: datosForm.birthDate,
    }

    //lo guarda en el LS y lo establece en el estado global
    localStorage.setItem(user.username, JSON.stringify(updatedUser))

    setUser(updatedUser)
    setIsFormValid(true)
    setShowUserDetails(true)
  }

  return (
    <div>
      <div className='form user-datos'>
        <h2>{user.username}</h2>
        {showUserDetails && (
          <div className="user-details">
            <p>Gender: {datosForm.gender}</p>
            <p>Phone number: {datosForm.phoneNumber}</p>
            <p>Birth Date: {datosForm.birthDate}</p>
          </div>
        )}
      </div>

      <form className='form' onSubmit={handleSubmit}>
        <div className="checkbox-group">
          <label htmlFor="gender">Gender:</label>
          <div>
            Male <input type="checkbox" id="male" name="gender" value="Male" checked={datosForm.gender === 'Male'} onChange={handleChange} />
            <br />
            Female <input type="checkbox" id="female" name="gender" value="Female" checked={datosForm.gender === 'Female'} onChange={handleChange} />
            <br />
            Other <input type="checkbox" id="other" name="gender" value="Other" checked={datosForm.gender === 'Other'} onChange={handleChange} />
          </div>
          <label htmlFor="phoneNumber" className="input">Phone number:</label>
          <input
            type="tel"
            id="user_login"
            name="phoneNumber"
            className="number"
            placeholder="Enter your phone number"
            value={datosForm.phoneNumber}
            onChange={handleChange}
            onBlur={() => handleBlur('phoneNumber')}
          />

          <label htmlFor="birthDate" className="input">Birth date:</label>
          <input
            type="date"
            id="user_login"
            name="birthDate"
            className="birthDate"
            value={datosForm.birthDate}
            onChange={handleChange}
            onBlur={() => handleBlur('birthDate')}
          />

          <p className='error-signup'>{mensajeError}</p>
          <button className='button_form button_form_signup' type="submit" disabled={!isFormValid}>
            Save changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default Profile;
