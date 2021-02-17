import { useState } from 'react'

// Utils
import User from '../utils/UserAPI'

const UserContext = () => {

    const [user, setUser] = useState({})

    const setUserOnLoad = async (token) => {


        let { data } = await User.findUser(token)

        setUser(data)
    }

    const logout = () => {
        localStorage.removeItem("token")
        window.location.replace('/login')
    }

    return { user, setUserOnLoad, logout }
}


export default UserContext