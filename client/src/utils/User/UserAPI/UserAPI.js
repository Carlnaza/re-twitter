import axios from 'axios'

const User = {
    findUser: (token) => axios.get(`/api/user`, { headers: { "Authorization": `Bearer ${token}` } })
}

export default User