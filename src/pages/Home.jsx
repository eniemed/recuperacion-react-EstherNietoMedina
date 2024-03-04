import React from 'react'
import foto_home from '../assets/foto_home.png'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <article id='home'>
        <section>
            <p id='frase_home'>Find the book you've <br/> always been looking for</p>
            <NavLink to='/shop'><button id='start_searching'>START SEARCHING</button></NavLink>
        </section>
        <img id='foto_home' src={foto_home}></img>
    </article>
  )
}

export default Home