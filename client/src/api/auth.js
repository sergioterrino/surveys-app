import axios from './axios'

export const loginRequest = (data) => axios.post('/login/', data)

export const signupRequest = (data) => axios.post('/signup/', data)

export const tokenAuthRequest = (token) => axios.get('/user/', {
  headers: {
    'Authorization': `Token ${token}`
  }
})