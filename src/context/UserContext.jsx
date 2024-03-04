import { createContext, useState } from "react"


export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    loggedIn: false,
    username: '',
    password: '',
    favorites: []
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
