import axios from 'axios'

const apiUrl = process.env.VITE_API_URL;

// const instance = axios.create({
//   baseURL: 'http://localhost:8000/api'
// })
// const instance = axios.create({
//   baseURL: 'https://sortinghat-api.onrender.com/api'
// })
const instance = axios.create({
  baseURL: apiUrl
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