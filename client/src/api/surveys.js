import axios from './axios'

export const getSurveys = () => axios.get('/surveys/')

export const getQuestions = (survey) => axios.get(`/surveys/${survey.id}/questions`)

export const fillSurvey = (id_s, answers) => axios.post(`/surveys/${id_s}/questions/fillout/`, answers)

export const createSurvey = (survey) => axios.post('/surveys/', survey)