import { Redirect } from 'react-router-dom'

export default function ProtectedPage(props) {

    return (
        <>
            {
                localStorage.getItem('token') ?
                    props.children
                    :
                    <Redirect to="/login" />
            }
        </>
    )
}