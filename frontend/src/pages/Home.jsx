import { useState, useEffect, useRef } from "react"

const Home = () => {
  const [tasks, setTasks] = useState([])
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(null)
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef(null)

  const API_URL = import.meta.env.VITE_API_URL
  const USER_ID = "123"

  useEffect(() => {
    const fetchingTasks = async () => {
      setLoader(true)
      try {
        const response = await fetch(`${API_URL}?userId=${USER_ID}`)
        const data = await response.json()
        setTasks(data.data)
      } catch (error) {
        setError("Error al recuperar las tareas")
      } finally {
        setLoader(false)
      }
    }

    fetchingTasks()
  }, [])

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    const recognition = new SpeechRecognition()

    recognition.lang = "es-AR"
    recognition.continuous = true
    recognition.intermResults = false

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim()
      addTask(transcript.charAt(0).toUpperCase() + transcript.slice(1) + '.')
    }

    recognitionRef.current = recognition
  }, [])

  const toggleListening = () => {
    isListening ? recognitionRef.current.stop() : recognitionRef.current.start()
    setIsListening(!isListening)
  }

  const addTask = async (text) => {
    // Ir a la veterinaria.
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, userId: USER_ID })
      })
      const data = await res.json()
      setTasks(prev => [data.data, ...prev])
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      if (confirm("¡Esta seguro que quieres borrar esta tarea?")) {
        await fetch(`${API_URL}/${id}?userId=${USER_ID}`, {
          method: "DELETE"
        })
        setTasks(tasks.filter(t => t._id !== id))
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleComplete = async ({ _id, completed }) => {

    try {
      const res = await fetch(`${API_URL}/${_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed, userId: USER_ID })
      })
      const data = await res.json()
      setTasks(tasks.map(t => t._id === _id ? data.data : t))
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      {loader && <h2>Cargando...</h2>}
      {error && <h2>{error}</h2>}
      <div>
        <button onClick={toggleListening}>{isListening ? "Grabando..." : "Grabar"}</button>
      </div>
      {
        tasks.length > 0 &&
        <ul>
          {
            tasks.map((task) => (
              <li key={task._id}>{task.text}
                <button onClick={() => handleComplete(task)}>{task.completed ? "No completado" : "Realizada"}</button>
                <button onClick={() => handleDelete(task._id)}>Borrar</button>
              </li>
            ))
          }
        </ul>
      }
    </>
  )
}

export { Home }