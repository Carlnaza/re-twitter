import axios from 'axios'

const Tweet = {
    submit: (body) => axios.post('/api/users/tweet', { message: body }, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
}

export default Tweet