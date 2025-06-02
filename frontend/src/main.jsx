import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TodoList } from './components/TodoList.jsx'
import { Home } from './pages/Home.jsx'
import { RouterApp } from './router/RouterApp.jsx'
import { AuthProvider } from './context/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterApp />
    </AuthProvider>
  </StrictMode>,
)
