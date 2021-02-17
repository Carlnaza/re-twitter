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
            <h1>Suggestions</h1>
            <Button
                color="danger"
                className="rounded-pill"
                onClick={() => logout()}
            >Logout</Button>
        </Col>
    )
}