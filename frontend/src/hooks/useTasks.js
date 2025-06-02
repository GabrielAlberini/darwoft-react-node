import { useEffect, useState, useRef } from "react"
import { createTask, deleteTasks, getTasks, updateTask } from "../services/api"
import { useAuth } from "../context/authContext"
// import { createTask, deleteTasks, getTasks, updateTask } from "@/services/api"

const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(null)
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef(null)

  const { token } = useAuth()

  useEffect(() => {
    const fetchingTasks = async () => {
      setLoader(true)
      try {
        const tasks = await getTasks(token)
        setTasks(tasks)
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
    try {
      const data = await createTask(text, USER_ID)
      setTasks(prev => [data, ...prev])
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      if (confirm("¡Esta seguro que quieres borrar esta tarea?")) {
        await deleteTasks(id, USER_ID)
        setTasks(tasks.filter(t => t._id !== id))
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleComplete = async ({ _id, completed }) => {
    try {
      const data = await updateTask(_id, completed, USER_ID)
      setTasks(tasks.map(t => t._id === _id ? data : t))
    } catch (error) {
      console.log(error.message)
      setError(error.message)
    }
  }

  return {
    tasks,
    loader,
    error,
    isListening,
    toggleListening,
    handleDelete,
    handleComplete
  }
}

export { useTasks }