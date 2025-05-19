import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

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

// Modelo
const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: String, required: true }
}, { versionKey: false, timestamps: true })

const Task = mongoose.model('Task', taskSchema)

// Rutas
app.get('/api/tasks', async (req, res) => {
  const userId = req.query.userId
  if (!userId) return res.status(400).json({ success: false, message: 'Falta userId' })

  try {
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 })
    res.json({ success: true, data: tasks })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

app.post('/api/tasks', async (req, res) => {
  const { text, userId } = req.body
  if (!text || !userId) {
    return res.status(400).json({ success: false, message: 'Faltan campos requeridos' })
  }

  try {
    const newTask = await Task.create({ text, userId, completed: false })
    res.status(201).json({ success: true, data: newTask })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

app.patch('/api/tasks/:id', async (req, res) => {
  const { completed, userId } = req.body
  if (!userId) return res.status(400).json({ success: false, message: 'Falta userId' })

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { completed, userId }, { new: true })
    if (!task) return res.status(404).json({ success: false, message: 'Tarea no encontrada' })

    res.json({ success: true, data: task })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

app.delete('/api/tasks/:id', async (req, res) => {
  const userId = req.query.userId
  if (!userId) return res.status(400).json({ success: false, message: 'Falta userId' })

  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId })
    if (!task) return res.status(404).json({ success: false, message: 'Tarea no encontrada' })
    res.json({ success: true, data: task })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})
