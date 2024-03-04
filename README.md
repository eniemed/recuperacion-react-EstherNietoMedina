# ENLACE AL NUEVO DESPLIEGUE (recuperación)

https://65e63f201341d609432e79a1--unique-khapse-94469d.netlify.app/


## Nuevas funcionalidades añadidas:

<li>Evento que depende de la posición de la pantalla -> flecha que vuelve al top de la página al hacer scroll</li>
<li>Arreglos en experiencia del usuario -> registro manda a la página principal y loggea automáticamente, antes obligaba a loggear tras haberse registrado y era tedioso para el usuario</li>
<li>Perfil de usuario implementado -> muestra el nombre de usuario y añade un formulario con varios campos para aumentar la información del mismo</li>
<li>Punto que aplica al anterior -> añadido de más tipos de inputs (numérico, select, checkbox, email, etc)</li>
<li>Arreglado problema de consola relacionado con una key usada en los libros de la página de favoritos -> implementada una key aleatoria</li>
<li>Añadido buscador que llama a la api para realizar búsquedas por input del usuario</li>
<li>Añadidos filtros por más de 4 géneros en formato select</li>
<li>Añadido reconocimiento del libro que está en favoritos y se visualiza desde la tienda si ya está en favoritos</li>
<li>Implementado un botón por libro guardado en la página de favoritos que permite eliminarlo de favoritos</li>
<li>Arreglado duplicidad de los libros en favoritos cuando se les clicaba varias veces, ahora antes de añadirlo recorre los favoritos y si está lo omite</li>
<li>Añadida paginación -> se muestran 21 libros por página (para cuadrarlo mientras sea posible, ya que se muestran 3 por fila) y añadidos botones para ir hacia delante o hacia atrás por las páginas de libros. Se calculan las páginas necesarias para mostrar todos los resultados y también sale en el footer con el formato "Page 1 of 5"</li>
<li>Llamada anidada implementada -> los cards ahora son clicables y abren un modal que añade y quita una clase para mostrar todos los géneros bajo los que está el libro en cuestión. Si el libro no tiene un género asignado (como puede pasar con los menos conocidos o calendarios y planners) simplemente se muestra el título del libro</li>

# ¡IMPORTANTE!
### La api es extremadamente lenta, así que tras realizar cualquier búsqueda, uso de filtro, o incluso al entrar en la página de tienda por favor ser paciente, todo funciona pero bastante lento a veces.
