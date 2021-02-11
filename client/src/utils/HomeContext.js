import { useState } from 'react'

// Utils
import Tweet from './TweetAPI'
import FormContext from './FormContext.js'

const HomeContext = () => {

    const {
        setDisabled,
        setSuccess
    } = FormContext()

    const [tweet, setTweet] = useState({
        input: '',
        image: ''
    })

    const handleTweetInputChange = (event) => {
        setTweet({ ...tweet, [event.target.name]: event.target.value })
    }

    const submitTweet = async () => {
        setDisabled(true)
        let { data: tweetRes } = await Tweet.submit(tweet.input)
        if (tweetRes.status === 200) {
            setDisabled(false)
            setTweet({ input: '', image: '' })
        }
        console.log(tweetRes)
    }

    return {
        tweet,
        handleTweetInputChange,
        submitTweet
    }
}

export default HomeContext