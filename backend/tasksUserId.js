import { Router } from 'express'
import mongoose from 'mongoose'

const tasksRouter = Router()

// Modelo
const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: String, required: true }
}, { versionKey: false, timestamps: true })

const Task = mongoose.model('Task', taskSchema)

// Rutas
tasksRouter.get('/', async (req, res) => {
  const userId = req.query.userId
  if (!userId) return res.status(400).json({ success: false, message: 'Falta userId' })

  try {
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 })
    res.json({ success: true, data: tasks })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

tasksRouter.post('/', async (req, res) => {
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

tasksRouter.patch('/:id', async (req, res) => {
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

tasksRouter.delete('/:id', async (req, res) => {
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

export { tasksRouter }