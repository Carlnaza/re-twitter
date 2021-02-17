import axios from 'axios'

const User = {
    findUser: (token) => axios.get(`/api/user-info`, { headers: { "Authorization": `Bearer ${token}` } }),
    verifyEmail: (token) => axios.put(`/api/user/verify`, token),
    register: (user) => axios.post('/api/users/register', user),
    login: (user) => axios.post('/api/users/login', user)
}

export default User










axios.get(`/api/user-info`, { headers: { "Authorization": `Bearer ${token}` } })