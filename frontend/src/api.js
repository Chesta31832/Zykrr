import axios from 'axios'

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const analyzeTicket = async (message) => {
  try {
    const response = await api.post('/tickets/analyze', { message })
    return response.data
  } catch (error) {
    throw error.response?.data?.error || error.message
  }
}

export const getTickets = async ({ limit = 50, skip = 0, category = null, priority = null, search = null } = {}) => {
  try {
    const params = { limit, skip }
    if (category) params.category = category
    if (priority) params.priority = priority
    if (search) params.search = search
    
    const response = await api.get('/tickets', { params })
    return response.data
  } catch (error) {
    throw error.response?.data?.error || error.message
  }
}

export const healthCheck = async () => {
  try {
    const response = await api.get('/health')
    return response.data
  } catch (error) {
    throw error
  }
}
