import axios from 'axios'

const User = {
    findUser: (token) => axios.get(`/api/user`, { headers: { "Authorization": `Bearer ${token}` } }),
    verifyEmail: (token) => axios.put(`/api/users/emailconfirm/${token}`)
}

export default User