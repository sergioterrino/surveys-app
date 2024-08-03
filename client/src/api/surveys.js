import axios from './axios'

export const login = (data) => axios.post('/login/', data)

export const signup = (data) => axios.post('/signup/', data)

export const getSurveys = () => axios.get('/surveys/')

export const getQuestions = (survey) => axios.get(`/surveys/${survey.id}/questions`)

export const fillSurvey = (id_s, answers) => axios.post(`/surveys/${id_s}/questions/fillout/`, answers)