import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

const Favorites = () => {
  const { user } = useContext(UserContext)
  const [favoritos, setFavoritos] = useState([])


  //recojo los favoritos del localStorage y los establezco en el estado global
  useEffect(() => {
    const getFavoritesFromLocalStorage = () => {
      const usuario = localStorage.getItem(user.username)

      if (usuario) {
        const usuarioActual = JSON.parse(usuario)
        setFavoritos(usuarioActual.favorites)
      }
    }

    getFavoritesFromLocalStorage()
  }, [user.username])

  //se eliminan los favoritos que el usuario ya no quiera con un filter que actualiza el estado
  const removeFromFavorites = (libro) => {
    const nuevosFavoritos = favoritos.filter((fav) => !(fav.titulo === libro.titulo && fav.cover_i === libro.cover_i))
    setFavoritos(nuevosFavoritos)
  
    //y luego se actualiza en el LS
    const userActual = JSON.parse(localStorage.getItem(user.username)) || { favorites: [] }
    userActual.favorites = nuevosFavoritos
    localStorage.setItem(user.username, JSON.stringify(userActual))
  }
  

  //para resolver el problema que me daba la consola de la key no única, sigo el consejo del profesor y le doy como key un número aleatorio
  const generateRandomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000)
  }


  //muestra los favoritos 
  const muestraFavorites = () => {
    return (
      <article className='favorite-structure'>
        <section>
          <h1 className='shop-title'>My Favorites</h1>
        </section>
        <section className='favorite-list'>
          {favoritos.map((libro) => (
            <div key={generateRandomNumber()} className='book'>
              <img src={`https://covers.openlibrary.org/b/id/${libro.cover_i}-L.jpg`} className='favorite-cover' alt="Book cover" />
              {/* botón para borrar el libro en concreto de favs */}
              <button onClick={() => removeFromFavorites(libro)}>X</button>
            </div>
          ))}
        </section>
      </article>
    )
  }

  return (
    <article>
    {/* solo pueden acceder a favoritos aquellos que estén loggeados */}
      {user.loggedIn ? (
        muestraFavorites()
      ) : (
        <p className='shop-title'>Please log in to view your favorites!</p>
      )}
    </article>
  )
}

export default Favorites;
