import { Router } from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = 'clave_secreta_super_segura' // reemplazalo por variable de entorno

const authRouter = Router()

// MODELO DE USUARIO
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { versionKey: false })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

// GENERADOR DE TOKEN (incluye todos los datos necesarios para frontend)
const generateToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

// MIDDLEWARE DE AUTENTICACIÓN
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'No autorizado' })

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded // ya viene con id, name, email
    next()
  } catch {
    res.status(401).json({ message: 'Token inválido' })
  }
}

// RUTA: REGISTRO
authRouter.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password)
    return res.status(400).json({ message: 'Faltan campos' })

  const exists = await User.findOne({ email })
  if (exists)
    return res.status(400).json({ message: 'Email ya registrado' })

  const user = await User.create({ name, email, password })

  res.status(201).json({
    token: generateToken(user)
  })
})

// RUTA: LOGIN
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: 'Credenciales inválidas' })

  res.json({
    token: generateToken(user)
  })
})

export { authRouter, protect }
