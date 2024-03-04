import React from 'react'
import { useRouteError } from 'react-router-dom'

const Notfound = () => {

  const error = useRouteError()

  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
      <p>{error.statusText}</p>
    </div>
  )
}

export default Notfound