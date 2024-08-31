import axios from './axios'

export const createSurvey = (survey) => axios.post('/surveys/', survey)

// export const getSurveys = () => axios.get('/surveys/')
export const getSurveys = (page = 1) => axios.get(`/surveys/?page=${page}`)

export const getUserSurveys = () => axios.get('/profile/')

export const updateSurvey = (id, survey) => axios.put(`/surveys/${id}/`, survey)

export const deleteSurvey = (id) => axios.delete(`/surveys/${id}/`)

export const fillSurvey = (id_s, answers) => axios.post(`/surveys/${id_s}/questions/fillout/`, answers)

export const getQuestions = (id) => axios.get(`/surveys/${id}/questions/`)

export const createQuestion = (data) => axios.post('/questions/', data);

export const updateQuestion = (data) => axios.patch(`/questions/${data.id}/`, data)

export const deleteQuestion = (id) => axios.delete(`/questions/${id}/`)

export const getUsernameById = (id) => axios.get(`/get_username/${id}/`)

export const getAnswers = (id) => axios.get(`/surveys/${id}/results/overall/`)

// export const generatePlot = (id) => axios.get(`/generate-plot/${id}/`)

export const generatePlot = (surveyId, plotType) => {
  return axios.get(`/generate-plot/${surveyId}/${plotType}/`, { responseType: 'blob' });
};