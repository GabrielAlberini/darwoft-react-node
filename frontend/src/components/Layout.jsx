const Layout = ({ children }) => {
  return (
    <>
      <header>
        <ul>
          <li>Home</li>
          <li>Contacto</li>
        </ul>
      </header>
      <main>{children}</main>
      <footer><h2>Sitio desarrollado por Pepito</h2></footer>
    </>
  )
}

export { Layout }