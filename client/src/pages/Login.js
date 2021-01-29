import { Redirect } from 'react-router-dom'

export default function Login() {
    return (
        <>
            {
                localStorage.getItem('token') ? <Redirect to='/home' /> :
                    <>
                        <h1>Login Page</h1>
                    </>
            }
        </>
    )
}