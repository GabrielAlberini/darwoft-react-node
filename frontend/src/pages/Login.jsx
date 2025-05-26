import { useState } from "react"
import { Layout } from "../components/Layout"

const Login = () => {
  // Recuperar user a través del contexto del usuario
  const [user, setUser] = useState(false)
  return <Layout>
    <>
      {
        !user ? <form>
          <input type="text" />
        </form> : <h1>Usuario logueado</h1>
      }
    </>
  </Layout>
}

export { Login }