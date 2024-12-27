import axios from "axios";

const api = axios.create({
    baseURL: 'https://apisyamresto.syamdev.my.id/api',
    timeout: 5000
})

api.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('token')
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`
        // }
        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // if (error.response?.status === 401) {
        //     window.location.href = '/login'
        // }
        return Promise.reject(error)
    }
)

export default api