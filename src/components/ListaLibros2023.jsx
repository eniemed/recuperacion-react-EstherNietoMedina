import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import '../index.css';

const ListaLibros2023 = () => {
  const [libros2023, setLibros2023] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('default')
  const [results, setResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [booksPerPage] = useState(21)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [favoritos, setFavoritos] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const { user } = useContext(UserContext)

  useEffect(() => {
    const fetchLibros2023 = async () => {
      try {
        const response = await fetch('https://openlibrary.org/search.json?q=2023')
        const data = await response.json()
        setLibros2023(data.docs || [])
      } catch (error) {
        console.error('Error fetching libros2023:', error)
      }
    }

    fetchLibros2023()
  }, [])

  //menejo el scroll y hago que cuando se baje un poco en el eje Y se muestre la flechita
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  //llamada a la api que permite hacer búsquedas y luego se establece la pag que se muestra en la primera posicion
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}`)
        const data = await response.json()
        setResults(data.docs || [])
        setCurrentPage(1)
      } catch (error) {
        console.error('Error fetching search results:', error)
      }
    }

    //si se queda el buscador vacio se vuelve a la página de tienda principal mostrando las novedades de 2023
    if (searchQuery.trim() !== '') {
      fetchSearchResults()
    }
  }, [searchQuery])

  //se llama a la api para recuperar un género en especifico de libros, con un límite de 100 libros 
  useEffect(() => {
    const fetchSubjectResults = async (subject) => {
      try {
        const response = await fetch(`https://openlibrary.org/subjects/${subject}.json?limit=100`)
        const data = await response.json()
        //se actualiza el estado de results con los libros encontrados en la busqueda
        setResults(data.works || [])
        setCurrentPage(1)
      } catch (error) {
        console.error('Error fetching subject results:', error)
      }
    }

    if (selectedSubject !== 'default') {
      fetchSubjectResults(selectedSubject)
    }
  }, [selectedSubject])

  //recojo los favoritos del user y los establezco en la variable global siempre que esté loggeado
  useEffect(() => {
    if (user.loggedIn) {
      const userActual = JSON.parse(localStorage.getItem(user.username)) || { favorites: [] }
      setFavoritos(userActual.favorites)
    }
  }, [user.loggedIn])


  const agregarFavorites = (libro) => {
    if (user.loggedIn) {
      const index = favoritos.findIndex(fav => fav.titulo === libro.title && fav.cover_i === libro.cover_i)

      if (index === -1) {
        const nuevosFavoritos = [...favoritos, { titulo: libro.title, cover_i: libro.cover_i }]
        setFavoritos(nuevosFavoritos)

        const userActual = JSON.parse(localStorage.getItem(user.username)) || { favorites: [] }
        userActual.favorites = nuevosFavoritos
        localStorage.setItem(user.username, JSON.stringify(userActual))
      }
    }
  }

  //manejo los cambios en el search input y establezco el filtro en default para evitar problemas con la api (api propensa a problemas según algunos foros, se recomienda usar así los filtros)
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    if (selectedSubject !== 'default') {
      setSelectedSubject('default')
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
  }

  //lo mismo con los filtros, hago que la busqueda se vacie
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value)
    setSearchQuery('')
  }


  //determino que resultados se van a mostrar para que si están vacios el buscador y el filtro se muestre la pag principal de la tienda
  const displayResults = searchQuery.trim() !== '' || selectedSubject !== 'default' ? results : libros2023

  //calculo el indice de el ultimo y primer libro de la pag y luego calculo los libros de la pag actual
  const lastBookIndex = currentPage * booksPerPage
  const firstBookIndex = lastBookIndex - booksPerPage
  const currentBooks = displayResults.slice(firstBookIndex, lastBookIndex)


  //establece la pantalla arriba del todo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  //calculo el total de paginas con la division de la cantidad de resultados entre los libros que quiero que se muestren por cada una (21 porque se muestran en filas de 3)
  //y lo redondeo hacia arriba con Math.ceil para visualizar todos los resultados incluso si la última página se queda con menos de 21 libros
  const totalPages = Math.ceil(displayResults.length / booksPerPage)

  //funcion que controla lo que pasa cuando cambias de página:
  //cambia el numerito de la paginación en el pie del componente y lleva la pantalla hacia arriba para mejor experiencia del usuario
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      scrollToTop()
    }
  }

  //recupera el libro con una llamada y saca varios datos del autor para usarlo más fácilmente
  const openModal = async (libro) => {
    try {
      const response = await fetch(`https://openlibrary.org${libro.key}.json`)
      const data = await response.json()

      if (data.author_key && data.author_key.length > 0) {
        const authorKey = data.author_key[0]
        const authorInfoResponse = await fetch(`https://openlibrary.org/authors/${authorKey}.json`)
        const authorInfo = await authorInfoResponse.json()

        const author = {
          key: authorKey,
          name: authorInfo.name,
          birth_date: authorInfo.birth_date,
          top_work: authorInfo.top_work,
          work_count: authorInfo.work_count,
          top_subjects: authorInfo.top_subjects,
        }

        data.author = author
      }

      //le añade clase al modal
      setSelectedBook(data)
      document.body.classList.add('modal-open')
    } catch (error) {
      console.error('Error fetching book details:', error)
    }
  }

  //cierra el modal quitándole la clase
  const closeModal = () => {
    setSelectedBook(null)
    document.body.classList.remove('modal-open')
  }

  return (
    <article className='shop-estructure'>
      {showScrollToTop && (
        <button className="scroll-to-top show" onClick={scrollToTop}>
          {/* &uarr; se usa en html para representar una flechita hacia arriba, así he podido manejar un poco mejor el css para hacerla más grande etc */}
          &uarr;
        </button>
      )}

      <section>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className='search'
            />
            <button type="submit" className='search-btn'>🔍</button>

          </div>
          <select value={selectedSubject} onChange={handleSubjectChange} className='filtro'>
            <option value="default">Choose your subject...</option>
            <option value="adventure">Adventure</option>
            <option value="romance">Romance</option>
            <option value="horror">Terror</option>
            <option value="fiction">Fiction</option>
            <option value="comedy">Comedy</option>
          </select>
        </form>
        <ul className='book-list'>
          {currentBooks.map((libro) => (
            <li key={libro.key} className="book-container" onClick={() => openModal(libro)}>
              <img src={`https://covers.openlibrary.org/b/id/${libro.cover_i}-L.jpg`} alt={`Portada de ${libro.title}`} className="book-cover" />
              <div className="book-info">
                <h2 className="book-title">{libro.title}</h2>
                <p className="book-authors">{libro.author_name ? libro.author_name.join(', ') : 'Desconocido'}</p>
                <p className="book-year">Published on {libro.publish_year ? Math.max(...libro.publish_year) : 'Desconocido'}</p>
                <div className='book_cartBTN_icon'>
                  <button className="book_cartBTN">Add to cart</button>
                  <span className={`heart-icon ${user.loggedIn && favoritos.some(fav => fav.titulo === libro.title && fav.cover_i === libro.cover_i) ? 'favorite' : ''}`} onClick={(e) => { e.stopPropagation(); agregarFavorites(libro); }}>❤</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="pagination-buttons">
          {currentPage > 1 && (
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              ←
            </button>
          )}
          <span>Page {currentPage} of {totalPages}</span>
          {currentBooks.length === booksPerPage && currentPage < totalPages && (
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
              →
            </button>
          )}
        </div>
      </section>

      {selectedBook && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>X</span>
            <h2 className='shop-title'>{selectedBook.title}</h2>

            {selectedBook.subjects && (
              <div className='book-subjects'>
                <h3>Subjects:</h3>
                <ul>
                  {selectedBook.subjects.map((subject, index) => (
                    <li key={index}>{subject}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  )
}

export default ListaLibros2023;
