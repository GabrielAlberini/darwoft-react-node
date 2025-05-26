import { Link } from "react-router-dom"

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </header>
      <main>{children}</main>
      <footer><h2>Sitio desarrollado por Pepito</h2></footer>
    </>
  )
}

export { Layout }