import axios from 'axios'
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
    faTimesCircle,
    faComment,
    faRetweet,
    faHeart
} from '@fortawesome/free-solid-svg-icons'

// Context
import FormContext from '../utils/FormContext.js'

// Images
import test from '../images/test.jpg'
import test2 from '../images/test2.PNG'
import logo from '../images/logo-test.gif'


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

    const fakeData = [
        {
            handle: "@tweeter1",
            title: "Fake Tweet 1",
            body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
            image: test,
            profile: logo,
            comments: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            retweets: [1, 1, 1, 1],
            likes: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        },
        {
            handle: "@tweeter2",
            title: "Fake Tweet 2",
            body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
            profile: logo,
            comments: [1, 1, 1, 1],
            retweets: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            likes: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        },
        {
            handle: "@tweeter3",
            title: "Fake Tweet 777777777 tucker sucks",
            body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
            image: test,
            profile: test2,
            comments: [1, 1, 1, 1],
            retweets: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            likes: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        },
        {
            handle: "@tweeter4",
            title: "Fake Tweet 4",
            body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
            image: test2,
            profile: logo,
            comments: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            retweets: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            likes: [1, 1, 1, 1]
        },
        {
            handle: "@tweeter5",
            title: "Fake Tweet 5",
            body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
            image: test,
            profile: logo,
            comments: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            retweets: [1, 1, 1, 1],
            likes: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        },
        {
            handle: "@tweeter6",
            title: "Fake Tweet 6",
            profile: logo,
            body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
            comments: [1, 1, 1, 1],
            retweets: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            likes: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        },
        {
            handle: "@tweeter7",
            title: "Fake Tweet 777777777 tucker sucks",
            body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
            image: test,
            profile: logo,
            comments: [1, 1, 1, 1],
            retweets: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            likes: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        },
        {
            handle: "@tweeter8",
            title: "Fake Tweet 8",
            body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
            image: test2,
            profile: test2,
            comments: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            retweets: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            likes: [1, 1, 1, 1]
        }
    ]

    axios.get('/api/all-users')
        .then(data => {
            console.log(data)
        })
        .catch(err => console.error(err))

    const TweetCard = (props) => {

        return (
            <div className="cs-tweet-container">
                <div className="border-bottom d-flex p-3 pl-1">
                    <Col lg={1} className="p-0 mr-2">
                        <img src={props.profile} alt="logo" className="cs-tweet-profile-photo rounded-circle" />
                    </Col>
                    <Col lg={11}>
                        <div>
                            <div>
                                {/* <a href="#"> */}
                                <p className="d-inline text-white font-weight-bold">{props.title}</p>
                                {/* </a> */}
                                <p className="d-inline text-muted ml-1">{props.handle}</p>
                            </div>
                            <div>
                                <p className="text-white">{props.body}</p>
                            </div>
                            {
                                props.img &&
                                <div>
                                    <img src={props.img} alt="test" className="cs-tweet-image border border-secondary" />
                                </div>
                            }
                            <div className="d-flex justify-content-around">
                                <div className="cs-tweet-interact-section-reply">
                                    <button className="cs-tweet-btn-interact cs-tweet-btn-reply rounded-circle text-secondary">
                                        <FontAwesomeIcon icon={faComment} />
                                    </button>
                                    <span className="text-secondary cs-tweet-count-reply">{props.comments.length}</span>
                                </div>
                                <div className="cs-tweet-interact-section-retweet">
                                    <button className="cs-tweet-btn-interact cs-tweet-btn-retweet rounded-circle text-secondary">
                                        <FontAwesomeIcon icon={faRetweet} />
                                    </button>
                                    <span className="text-secondary cs-tweet-count-retweet">{props.retweets.length}</span>
                                </div>
                                <div className="cs-tweet-interact-section-like">
                                    <button className="cs-tweet-btn-interact cs-tweet-btn-like rounded-circle text-secondary">
                                        <FontAwesomeIcon icon={faHeart} />
                                    </button>
                                    <span className="text-secondary cs-tweet-count-like">{props.likes.length}</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </div>
            </div>
        )
    }


    return (
        <Container>
            <Row>
                <Sidebar disabled={disabled} />
                {/* Tweet Card Form */}
                <Col
                    className="p-0"
                    lg={6}>
                    <ContentHeader title="Home" />
                    <div className="cs-content">
                        {/* Tweet Form */}
                        <div className="p-4 border-bottom">
                            <div className="mb-3">
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
                            </div>
                            {tweet.image &&
                                <div className="cs-tweet-image-container mt-2">
                                    <span className="cs-tweet-exit" onClick={() => handleDeleteTweetImg()}>
                                        <FontAwesomeIcon icon={faTimesCircle} size="lg" />
                                    </span>
                                    <img className="cs-tweet-image" src={tweet.image} alt="test" />
                                </div>
                            }
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
                        <div className="border-bottom cs-tweet-separator p-1"></div>
                        {/* End Tweet Card Form */}
                        {/* Content */}
                        {
                            fakeData.map((info, i) =>
                                <TweetCard
                                    key={i}
                                    handle={info.handle}
                                    profile={info.profile}
                                    title={info.title}
                                    body={info.body}
                                    img={info.image}
                                    comments={info.comments}
                                    retweets={info.retweets}
                                    likes={info.likes}
                                />
                            )
                        }
                        {/* End Content */}
                    </div>
                </Col>
                <Suggestionbar />
            </Row>
        </Container >
    )
}