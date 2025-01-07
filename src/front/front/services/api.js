import axios from 'axios';

// Configurar Axios con la URL base de la API
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;