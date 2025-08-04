// Configuración de la API
export const API_CONFIG = {
    BASE_URL: 'http://localhost:3001',
    ENDPOINTS: {
        LOGIN: '/api/login',
        REGISTER: '/api/register',
        HEALTH: '/health'
    }
}

// Función helper para construir URLs completas
export const getApiUrl = (endpoint) => {
    return `${API_CONFIG.BASE_URL}${endpoint}`
}

// Función helper para hacer requests a la API
export const apiRequest = async (endpoint, options = {}) => {
    const url = getApiUrl(endpoint)

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const finalOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        },
    }

    console.log(`🌐 API Request: ${finalOptions.method || 'GET'} ${url}`)

    const response = await fetch(url, finalOptions)
    const data = await response.json()

    console.log(`📡 API Response: ${response.status}`, data)

    return { response, data }
}