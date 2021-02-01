import Axios from 'axios'

const User = {
  verifyEmail: (token) => Axios.put(`/api/users/emailconfirm/${token}` )
}

export default User