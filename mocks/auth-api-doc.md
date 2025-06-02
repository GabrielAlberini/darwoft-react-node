
# 📘 Documentación de la API - Autenticación

Esta API permite registrar y autenticar usuarios mediante JWT.

> **Base URL:** `http://localhost:4000/api`

---

## 📌 Endpoints

### 🔹 POST `/auth/register`

**Descripción:** Registra un nuevo usuario.

**Body requerido:**
```json
{
  "email": "usuario@email.com",
  "password": "secreto123"
}
```

**Ejemplo de respuesta:**
```json
{
  "success": true,
  "data": {
    "_id": "664a87e8a1e8eaa82c0ec123",
    "email": "usuario@email.com",
    "createdAt": "2024-06-01T12:00:00.000Z",
    "updatedAt": "2024-06-01T12:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

---

### 🔹 POST `/auth/login`

**Descripción:** Inicia sesión y recibe un JWT.

**Body requerido:**
```json
{
  "email": "usuario@email.com",
  "password": "secreto123"
}
```

**Ejemplo de respuesta:**
```json
{
  "success": true,
  "data": {
    "_id": "664a87e8a1e8eaa82c0ec123",
    "email": "usuario@email.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

---

## 🔐 Autenticación

La mayoría de las rutas privadas (como `/tasks`) requieren autenticación JWT.

**Encabezado necesario:**
```
Authorization: Bearer <token>
```

---

## 🏷️ Esquema del modelo `User`

```js
{
  _id: String,
  email: String,        // Email único del usuario
  password: String,     // Hash de la contraseña
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🛡️ Seguridad recomendada

- Contraseñas hasheadas con `bcryptjs`
- JWT firmado con `JWT_SECRET`
- El token tiene expiración definida
- En frontend se recomienda almacenar el token de forma segura

---

**Autor:** Equipo Backend  
**Última actualización:** junio 2025
