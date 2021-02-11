import { useState } from 'react'

// Utils
import FormContext from './FormContext.js'
import Tweet from './TweetAPI'

const HomeContext = () => {

    const {
        setDisabled,
        setErrors,
        errors
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
        if (tweetRes.status === 400) {
            let errorObj = {
                tweetInput: tweetRes.message
            }
            console.log(errorObj)
            setErrors(errorObj)
        } else if (tweetRes.status === 200) {
            setDisabled(false)
            setTweet({ input: '', image: '' })
        }

    }

    return {
        tweet,
        handleTweetInputChange,
        submitTweet
    }
}

export default HomeContext