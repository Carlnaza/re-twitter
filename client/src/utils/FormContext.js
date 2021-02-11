import { useState } from 'react'
import User from './UserAPI'

const FormContext = () => {

    const [values, setValues] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        password2: '',
        phone: '',
        day: 1,
        month: 'January',
        year: '',
    })
    const [loginValues, setLoginValues] = useState({
        isLogging: false,
        loginUsername: '',
        loginPassword: ''
    })

    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState({})
    const [disabled, setDisabled] = useState(false)
    const [success, setSuccess] = useState(false)
    const [registerStatus, setRegisterStatus] = useState(false)

    const handleRegisterInputChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const handleLoginInputChange = (event) => {
        setLoginValues({ ...loginValues, [event.target.name]: event.target.value })
    }

    const handleSubmit = async () => {

        let user = {
            username: values.username,
            name: values.name,
            email: values.email,
            date_of_birth: ` ${values.month} ${values.day} ${values.year}`,
            year: values.year,
            phone: values.phone,
            password: values.password,
            password2: values.password2
        }

        setDisabled(true)

        setTimeout(async () => {
            let { data: response } = await User.register(user)

            if (response.status === 400) {
                setDisabled(false)
                setErrors(response.data)
            } else if (response.status === 200) {
                setErrors({})
                setModal(false)
                setSuccess(true)
                console.log(response)
            }
        }, 1000)

    }

    const handleLogin = async () => {
        if (!loginValues.isLogging) {
            setLoginValues({ ...loginValues, isLogging: true })
        }
        if (loginValues.isLogging) {
            let userObj = {
                username: loginValues.loginUsername,
                password: loginValues.loginPassword
            }
            setDisabled(true)
            let { data: loginInfo } = await User.login(userObj)
            console.log(loginInfo)
            if (loginInfo.status === 400) {
                setDisabled(false)
                setErrors(loginInfo.data)
            } else if (loginInfo.status === 200) {
                setErrors({})
                setSuccess(true)
                setTimeout(() => {
                    window.location.replace("/")
                    localStorage.setItem("token", loginInfo.token)
                }, 1000)
            }
        }
    }

    return {
        handleRegisterInputChange,
        handleLoginInputChange,
        handleSubmit,
        handleLogin,
        loginValues,
        values,
        errors,
        disabled,
        registerStatus,
        modal,
        setModal,
        success
    }
}

export default FormContext