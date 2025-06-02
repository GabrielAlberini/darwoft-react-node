// const API_URL = import.meta.env.VITE_API_URL
const NODE_DEV = import.meta.env.VITE_NODE_DEV ?? "development"

const API_URL = NODE_DEV === "production" ? import.meta.env.VITE_BASE_API_URL : "http://localhost:2222/tasks"

const getTasks = async (token) => {
  const response = await fetch(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()
  return data.data
}

const createTask = async (text, userId) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, userId })
  })
  const data = await res.json()
  return data.data
}

const deleteTasks = async (id, userId) => {
  await fetch(`${API_URL}/${id}?userId=${userId}`, {
    method: "DELETE"
  })
}

const updateTask = async (id, completed, userId) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !completed, userId })
  })
  const data = await res.json()
  return data.data
}

export { getTasks, createTask, deleteTasks, updateTask }