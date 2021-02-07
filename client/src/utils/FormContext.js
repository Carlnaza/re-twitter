import { useState } from 'react'
import User from '../utils/User/UserAPI'

const FormContext = (validate) => {

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

    const [errors, setErrors] = useState({})

    const [disabled, setDisabled] = useState(false)

    const handleInputChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const handleSubmit = async () => {

        let user = {
            username: values.username,
            name: values.name,
            email: values.email,
            date_of_birth: ` ${values.month} ${values.day} ${values.year}`,
            phone: values.phone,
            password: values.password
        }

        console.log(user)

        setErrors(validate(values))
        setDisabled(true)

        let register = await User.register(user)

        console.log(register.data)

    }

    return { handleInputChange, handleSubmit, values, errors, disabled, setDisabled }
}

export default FormContext