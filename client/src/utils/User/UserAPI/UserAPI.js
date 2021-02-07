import axios from 'axios'

const User = {
    findUser: (token) => axios.get(`/api/user`, { headers: { "Authorization": `Bearer ${token}` } }),
    verifyEmail: (token) => axios.put(`/api/user/verify`, token),
    register: (user) => axios.post('/api/users/register', user)
}

export default User