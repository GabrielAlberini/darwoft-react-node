import { Outlet } from "react-router-dom"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/authContext"

const Dashboard = () => {
  const { user } = useAuth()

  return <Layout>
    <h1>Página de Dashboard</h1>
    {
      user && <>
        <p><b>ID:</b>{user.id}</p>
        <p><b>Name:</b>{user.name}</p>
        <p><b>Email:</b>{user.email}</p>
      </>
    }
    <Outlet />
  </Layout>
}

export { Dashboard }