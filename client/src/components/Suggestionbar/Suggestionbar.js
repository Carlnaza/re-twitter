// Library
import {
    Col,
    Button
} from 'reactstrap'

// Utils
import UserContext from '../../utils/UserContext.js'

export default function Suggestionbar() {

    const {
        logout
    } = UserContext()

    return (
        <Col
            className="cs-announcements"
            lg={3}
        >
            <Button
                color="danger"
                className="rounded-pill mt-5"
                onClick={() => logout()}
            >Logout</Button>
        </Col>
    )
}