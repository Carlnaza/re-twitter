import { Redirect } from 'react-router-dom'

export default function Register() {
    return (
        <>
            {
                localStorage.getItem('token') ? <Redirect to='/home' /> :
                    <>
                        <h1>Register Page</h1>
                    </>
            }
        </>
    )
}