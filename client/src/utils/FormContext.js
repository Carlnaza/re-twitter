import { useState } from 'react'

// Utils
import User from './UserAPI'
import Tweet from './TweetAPI'
import { app } from '../firebaseConfig.js'

const FormContext = () => {

    const [tweet, setTweet] = useState({
        message: '',
        image: '',
        imageFileName: ''
    })

    const [tweetState, setTweetState] = useState({
        tweets: []
    })

    const [values, setValues] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        password2: '',
        phone: '',
        day: 1,
        month: 'January',
        year: '',
    })
    const [loginValues, setLoginValues] = useState({
        isLogging: false,
        loginUsername: '',
        loginPassword: ''
    })

    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState({})
    const [disabled, setDisabled] = useState(false)
    const [success, setSuccess] = useState(false)
    const [registerStatus, setRegisterStatus] = useState(false)

    const handleTweetInputChange = (event) => {
        setTweet({ ...tweet, [event.target.name]: event.target.value })
        setErrors({})
    }

    const handleRegisterInputChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const handleLoginInputChange = (event) => {
        setLoginValues({ ...loginValues, [event.target.name]: event.target.value })
    }

    const handleFileChange = async (event) => {
        const randomizer = '1234567890'
        let randomNum = ''

        for (let i = 1; i < 4; i++) {
            randomNum += randomizer[Math.floor(Math.random() * randomizer.length)]
        }

        const file = event.target.files[0]
        const randomizedFileName = 'RT' + randomNum + file.name
        const storageRef = app.storage().ref()
        const fileRef = storageRef.child(randomizedFileName)
        await fileRef.put(file)
        setTweet({ ...tweet, imageFileName: randomizedFileName, image: await fileRef.getDownloadURL() })
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        let user = {
            username: values.username,
            name: values.name,
            email: values.email,
            date_of_birth: ` ${values.month} ${values.day} ${values.year}`,
            year: values.year,
            phone: values.phone,
            password: values.password,
            password2: values.password2
        }

        setDisabled(true)

        let { data: response } = await User.register(user)

        if (response.status === 400) {
            setDisabled(false)
            setErrors(response.data)
        } else if (response.status === 200) {
            setErrors({})
            setDisabled(false)
            setModal(false)
            setSuccess(true)
            setValues({
                username: '',
                name: '',
                email: '',
                password: '',
                password2: '',
                phone: '',
                day: 1,
                month: 'January',
                year: ''
            })
            console.log(response)
        }

    }

    const submitTweet = async (e) => {
        setDisabled(true)

        let { data: tweetRes } = await Tweet.submit({
            message: tweet.message,
            images: tweet.image
        })

        let newTweet = [tweetRes.tweet, ...tweetState.tweets]
        console.log(tweetRes)

        if (tweetRes.status === 400) {
            let errorObj = {
                tweetInput: tweetRes.message
            }
            setErrors(errorObj)
            setDisabled(false)
        } else if (tweetRes.status === 200) {
            setTweetState({ ...tweetState, tweets: newTweet })
            setTweet({
                message: '',
                image: '',
                imageFileName: ''
            })
            setDisabled(false)
        }

    }

    const handleDeleteTweetImg = async () => {
        console.log(tweet)
        setTweet({ ...tweet, image: '', imageFileName: '' })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!loginValues.isLogging) {
            setSuccess(false)
            setLoginValues({ ...loginValues, isLogging: true })
        }
        if (loginValues.isLogging) {
            let userObj = {
                username: loginValues.loginUsername,
                password: loginValues.loginPassword
            }
            setDisabled(true)
            let { data: loginInfo } = await User.login(userObj)
            console.log(loginInfo)
            if (loginInfo.status === 400) {
                setDisabled(false)
                setErrors(loginInfo.data)
            } else if (loginInfo.status === 200) {
                setDisabled(false)
                setErrors({})
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                    window.location.replace("/")
                    localStorage.setItem("token", loginInfo.token)
                }, 1000)
            }
        }
    }

    const getAlgorithm = async (token) => {
        let { data: featuredTweets } = await User.getFeatured(token)
        let { data: userTweets } = await User.getUserRecent(token)

        if (featuredTweets.length > 0) {
            let allTweets = [...featuredTweets, ...userTweets]
            setTweetState({ ...tweetState, tweets: allTweets })
        } else {
            setTweetState({ ...tweetState, tweets: userTweets })
        }

    }

    return {
        handleFileChange,
        handleRegisterInputChange,
        handleLoginInputChange,
        handleRegisterSubmit,
        handleLogin,
        handleDeleteTweetImg,
        getAlgorithm,
        tweetState,
        loginValues,
        values,
        errors,
        setErrors,
        disabled,
        setDisabled,
        registerStatus,
        setRegisterStatus,
        modal,
        setModal,
        success,
        setSuccess,
        tweet,
        handleTweetInputChange,
        submitTweet
    }
}

export default FormContext