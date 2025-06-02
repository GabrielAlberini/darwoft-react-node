# 📘 Documentación de la API - Tareas App (con autenticación JWT)

Esta API permite gestionar tareas asociadas a usuarios autenticados.

> Base URL: `http://localhost:4000/api`

> ⚠️ Todos los endpoints requieren el envío de un token JWT válido en el header `Authorization`:
```
Authorization: Bearer <token>
```

---

## 📌 Endpoints

### 🔹 GET `/tasks`

**Descripción:** Devuelve todas las tareas del usuario autenticado.

**Headers:**
- `Authorization: Bearer <token>` (requerido)

**Ejemplo de respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "663c4f87a1e8eaa82c0ec3c1",
      "text": "Comprar verduras",
      "completed": false,
      "userId": "123",
      "createdAt": "2024-05-10T10:00:00.000Z",
      "updatedAt": "2024-05-10T10:00:00.000Z"
    }
  ]
}
```

---

### 🔹 POST `/tasks`

**Descripción:** Crea una nueva tarea para el usuario autenticado.

**Headers:**
- `Authorization: Bearer <token>` (requerido)

**Body requerido:**
```json
{
  "text": "Nueva tarea"
}
```

**Ejemplo de respuesta:**
```json
{
  "success": true,
  "data": {
    "_id": "663c4f87a1e8eaa82c0ec3c3",
    "text": "Nueva tarea",
    "completed": false,
    "userId": "123",
    "createdAt": "2024-05-12T09:00:00.000Z",
    "updatedAt": "2024-05-12T09:00:00.000Z"
  }
}
```

---

### 🔹 PATCH `/tasks/:id`

**Descripción:** Actualiza el estado de completado de una tarea.

**Headers:**
- `Authorization: Bearer <token>` (requerido)

**Body requerido:**
```json
{
  "completed": true
}
```

**Ejemplo de respuesta:**
```json
{
  "success": true,
  "data": {
    "_id": "663c4f87a1e8eaa82c0ec3c1",
    "text": "Comprar verduras",
    "completed": true,
    "userId": "123",
    "createdAt": "2024-05-10T10:00:00.000Z",
    "updatedAt": "2024-05-13T10:00:00.000Z"
  }
}
```

---

### 🔹 DELETE `/tasks/:id`

**Descripción:** Elimina una tarea del usuario autenticado.

**Headers:**
- `Authorization: Bearer <token>` (requerido)

**Ejemplo de respuesta:**
```json
{
  "success": true,
  "data": {
    "_id": "663c4f87a1e8eaa82c0ec3c2",
    "text": "Lavar la ropa",
    "completed": true,
    "userId": "123",
    "createdAt": "2024-05-09T15:30:00.000Z",
    "updatedAt": "2024-05-10T08:00:00.000Z"
  }
}
```

---

## 🧪 Mock de datos (`mockTasks.json`)

```json
[
  {
    "_id": "663c4f87a1e8eaa82c0ec3c1",
    "text": "Comprar verduras",
    "completed": false,
    "userId": "123",
    "createdAt": "2024-05-10T10:00:00.000Z",
    "updatedAt": "2024-05-10T10:00:00.000Z"
  },
  {
    "_id": "663c4f87a1e8eaa82c0ec3c2",
    "text": "Lavar la ropa",
    "completed": true,
    "userId": "123",
    "createdAt": "2024-05-09T15:30:00.000Z",
    "updatedAt": "2024-05-10T08:00:00.000Z"
  }
]
```

---

## 🏷️ Esquema del modelo `Task`

```js
{
  _id: String,
  text: String,         // Descripción de la tarea
  completed: Boolean,   // Estado de finalización
  userId: String,       // ID del usuario dueño (extraído del token)
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Middleware de autenticación (ejemplo)

```js
import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Token no provisto' })
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ success: false, message: 'Token inválido' })
  }
}
```

---

**Autor:** Equipo Backend  
**Última actualización:** junio 2025