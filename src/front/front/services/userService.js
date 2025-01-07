import api from './api';

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/user/create', userData);
        return response.data;
    } catch (error) {
        console.error('Error al registrar el usuario:', error.response?.data || error.message);
        throw error;
    }
};

