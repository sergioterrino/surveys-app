import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000/api'
})

// Esto es para enviar el token en el header de la petición, si existe
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Token ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance