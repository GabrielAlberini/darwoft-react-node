import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { authRouter, protect } from "./auth.js"
import { tasksRouter } from './tasksUserId.js'

// Configuración inicial
const app = express()
const PORT = process.env.PORT || 4000
const MONGO_URI = 'mongodb://localhost:27017/tareasApp'

// Middlewares
app.use(cors())
app.use(express.json())

// Conectar a MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err))

app.use("/api/auth", authRouter)
app.use("/api/tasks", protect, tasksRouter)

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})
