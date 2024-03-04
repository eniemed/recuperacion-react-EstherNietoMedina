import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import profPicture from '../assets/user-prof.png'
import { UserContext } from '../context/UserContext'

const Navbar = () => {
  const { user } = useContext(UserContext)

  return (
    <nav>
      <img src={logo} alt="Logo" />
      <ul id='links'>
        <NavLink to="/"><li>HOME</li></NavLink>
        <NavLink to="/shop"><li>SHOP</li></NavLink>
        <NavLink to="/favorites"><li>MY FAVORITES</li></NavLink>
        <NavLink to="/contact"><li>CONTACT</li></NavLink>
      </ul>

      {user.loggedIn ? (
        <NavLink to="/profile"><div id='user-profile'>
          <p>{user.username}</p>
          <img src={profPicture} />
        </div></NavLink>
      ) : (
        <ul id='authentication'>
          <NavLink to="/login"><li><button id='login'>LOG IN</button></li></NavLink>
          <NavLink to='/signup'><li><button id='signup'>SIGN UP</button></li></NavLink>
        </ul>
      )}
    </nav>
  )
}

export default Navbar
