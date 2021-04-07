import axios from 'axios'

const User = {
    findUser: (token) => axios.get(`/api/user-info`, { headers: { "Authorization": `Bearer ${token}` } }),
    verifyEmail: (token) => axios.put(`/api/user/verify`, token),
    register: (user) => axios.post('/api/users/register', user),
    login: (user) => axios.post('/api/users/login', user),
    getFeatured: (token) => axios.get(`/api/featured-tweets`, { headers: { "Authorization": `Bearer ${token}` } }),
    getUserRecent: (token) => axios.get(`/api/users-recent`, { headers: { "Authorization": `Bearer ${token}` } })
}

export default User