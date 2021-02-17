import { useEffect } from 'react'

// Library
import {
    Col,
    Button
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome,
    faHashtag,
    faBell,
    faEnvelope,
    faBookmark,
    faListAlt,
    faUser,
    faInfoCircle,
    faEllipsisH
} from '@fortawesome/free-solid-svg-icons'
import '../../pages/non-global.css'

// Utils
import UserContext from '../../utils/UserContext.js'


export default function Sidebar(props) {

    const { user, setUserOnLoad } = UserContext()

    useEffect(() => {
        setUserOnLoad(localStorage.getItem("token"))
        // eslint-disable-next-line
    }, [])

    return (
        <Col
            lg={3}
        >
            <div className="d-flex align-items-start flex-column cs-sidebar">
                <img src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c53e.png" height={75} width={75} alt="logo" />
                <Button
                    className="mb-3 cs-btn rounded-pill"
                >
                    <span className="text-center">
                        <FontAwesomeIcon icon={faHome} />
                    </span>
                    <span className="ml-4">
                        Home
                </span>
                </Button>
                <Button
                    className="mb-3 cs-btn rounded-pill"
                >
                    <span className="text-center">
                        <FontAwesomeIcon icon={faHashtag} />
                    </span>
                    <span className="ml-4">
                        Explore
                </span>
                </Button>
                <Button
                    className="mb-3 cs-btn rounded-pill"
                >
                    <span className="text-center">
                        <FontAwesomeIcon icon={faBell} />
                    </span>
                    <span className="ml-4">
                        Notifications
                </span>
                </Button>
                <Button
                    className="mb-3 cs-btn rounded-pill"
                >
                    <span className="text-center">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <span className="ml-4">
                        Messages
                </span>
                </Button>
                <Button
                    className="mb-3 cs-btn rounded-pill"
                >
                    <span className="text-center">
                        <FontAwesomeIcon icon={faBookmark} />
                    </span>
                    <span className="ml-4">
                        Bookmarks
                </span>
                </Button>
                <Button
                    className="mb-3 cs-btn rounded-pill"
                >
                    <span className="text-center">
                        <FontAwesomeIcon icon={faListAlt} />
                    </span>
                    <span className="ml-4">
                        Lists
                </span>
                </Button>
                <Button
                    className="mb-3 cs-btn rounded-pill"
                >
                    <span className="text-center">
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <span className="ml-4">
                        Profile
                </span>
                </Button>
                <Button
                    className="mb-4 cs-btn rounded-pill"
                >
                    <span className="text-center">
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </span>
                    <span className="ml-4">
                        More
                </span>
                </Button>
                <Button
                    className="mt-4 w-100 rounded-pill p-3 cs-tweet-btn"
                    color="primary"
                    disabled={props.disabled ? true : false}
                >
                    {props.disabled ?
                        <>
                            <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                            <span>Loading...</span>
                        </>
                        :
                        <span>Tweet</span>
                    }
                </Button>
                <Button
                    className="d-flex justify-content-around w-100 rounded-pill mt-auto mb-2 cs-user-btn"
                >
                    <span className="d-flex">
                        <span className="pt-2 mr-2">
                            <FontAwesomeIcon icon={faUser} size="2x" />
                        </span>
                        <span className="mr-4">
                            <span className="d-block cs-username">{user.name}</span>
                            <span className="d-block text-muted">@{user.username}</span>
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faEllipsisH} />
                        </span>
                    </span>
                </Button>
            </div>
        </Col>
    )
}