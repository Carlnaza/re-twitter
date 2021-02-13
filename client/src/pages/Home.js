
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
    faImage,
    faTimesCircle
} from '@fortawesome/free-solid-svg-icons'

// Context
import FormContext from '../utils/FormContext.js'


export default function Home() {

    const {
        disabled,
        errors,
        handleTweetInputChange,
        handleDeleteTweetImg,
        handleFileChange,
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
                            name="message"
                            value={tweet.message}
                            onChange={handleTweetInputChange}
                            disabled={disabled ? true : false}
                        />
                        {tweet.image &&
                            <div className="cs-tweet-image-container mt-2">
                                <span className="cs-tweet-exit" onClick={() => handleDeleteTweetImg()}>
                                    <FontAwesomeIcon icon={faTimesCircle} size="lg" />
                                </span>
                                <img className="cs-tweet-image" src={tweet.image} alt="test" />
                            </div>
                        }
                        <hr />
                        <label htmlFor="upload-photo" className="cs-upload-img-svg rounded-circle p-1">
                            <FontAwesomeIcon size="lg" icon={faImage} />
                        </label>
                        <input
                            type="file"
                            name="photo"
                            id="upload-photo"
                            onChange={handleFileChange} />
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