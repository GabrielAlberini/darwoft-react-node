import { Outlet } from "react-router-dom"
import { Layout } from "../components/Layout"

const Dashboard = () => {
  return <Layout>
    <h1>Página de Dashboard</h1>
    <Outlet />
  </Layout>
}

export { Dashboard }