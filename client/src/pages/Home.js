
// Components
import Sidebar from '../components/Sidebar'
import Suggestionbar from '../components/Suggestionbar'
import ContentHeader from '../components/ContentHeader'

// Library
import {
    Container,
    Row,
    Col,
    Button,
    Alert
} from 'reactstrap'
import './non-global.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faImage
} from '@fortawesome/free-solid-svg-icons'

// Context
import FormContext from '../utils/FormContext.js'


export default function Home() {

    const {
        disabled,
        errors,
        handleTweetInputChange,
        tweet,
        submitTweet
    } = FormContext()


    return (
        <Container>
            <Row>
                <Sidebar disabled={disabled} />
                {/* Tweet Card Form */}
                <Col
                    className="cs-content p-0"
                    lg={6}>
                    <ContentHeader title="Home" />
                    {/* Tweet Form */}
                    <div className="p-4 border-bottom">
                        {
                            errors.tweetInput && <Alert color="danger">{errors.tweetInput}</Alert>
                        }
                        <textarea
                            className="form-control cs-textarea"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            placeholder="What's happening?"
                            name="input"
                            value={tweet.input}
                            onChange={handleTweetInputChange}
                            disabled={disabled ? true : false}
                        />
                        <hr />
                        <label for="upload-photo">
                        <FontAwesomeIcon size="lg" icon={faImage} />

                        </label>
                        <input type="file" name="photo" id="upload-photo" />
                        <Button className="cs-btn-default rounded-circle">
                        </Button>
                        <Button
                            className="rounded-pill float-right"
                            color="primary"
                            onClick={() => submitTweet()}
                        >
                            {disabled ?
                                <>
                                    <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                    <span>Loading...</span>
                                </>
                                :
                                <span>Tweet</span>
                            }
                        </Button>
                    </div>
                </Col>
                {/* End Tweet Card Form */}
                {/* Content */}

                {/* End Content */}
                <Suggestionbar />
            </Row>
        </Container >
    )
}