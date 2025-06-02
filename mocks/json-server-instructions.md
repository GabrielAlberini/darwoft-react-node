# 🚀 Uso de json-server para mockear el backend

Esta guía permite levantar un servidor simulado que imita la API de tareas utilizando `json-server`.

---

## 📁 Paso 1: Crear el archivo `db.json`

Crea un archivo llamado `db.json` en la raíz del proyecto con el siguiente contenido:

```json
{
  "tasks": [
    {
      "id": "663c4f87a1e8eaa82c0ec3c1",
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

## 🧰 Paso 2: Instalar json-server

Si no lo tenés instalado globalmente:

```bash
npm install -g json-server
```

O como dependencia de desarrollo:

```bash
npm install json-server --save-dev
```

---

## 🚀 Paso 3: Levantar el servidor mock

Usá el siguiente comando para iniciar el servidor en el puerto 4000:

```bash
npx json-server --watch db.json --port 4000
```

---

## 🔄 Endpoints disponibles automáticamente

`json-server` genera automáticamente estos endpoints REST:

| Método | Endpoint       | Descripción             |
|--------|----------------|-------------------------|
| GET    | /tasks         | Obtener todas las tareas |
| GET    | /tasks/:id     | Obtener una tarea       |
| POST   | /tasks         | Crear nueva tarea       |
| PUT    | /tasks/:id     | Reemplazar una tarea    |
| PATCH  | /tasks/:id     | Modificar una tarea     |
| DELETE | /tasks/:id     | Eliminar una tarea      |

---

## ⚠️ Consideraciones

- No requiere conexión a MongoDB.
- No valida campos ni relaciones, simplemente simula un servidor REST.
- Ideal para desarrollo frontend y pruebas rápidas.

---

**Autor:** Equipo Backend  
**Última actualización:** junio 2025