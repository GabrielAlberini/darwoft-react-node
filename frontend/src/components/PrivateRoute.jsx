import { useState } from "react"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
  // Recuperar user a través del contexto del usuario
  const [user, setUser] = useState(true)
  return user ? children : <Navigate to={"/login"} />
}

export { PrivateRoute }