import User from '../utils/UserAPI'

// Library
import {
  Row,
  Col,
  Container,
  Button
} from 'reactstrap'

export default function EmailConfirm({ match }) {

  const verifyEmail = async () => {
    let token = {
      token: match.params.token
    }
    await User.verifyEmail(token)
      .then(({ data }) => {
        console.log(data)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div>
        <Row className="max-screen">
          <Col className="black" xl={6}>
            <div className="h-100 d-flex justify-content-center align-items-center">
              <img src="https://logos-world.net/wp-content/uploads/2020/04/Twitter-Logo.png" height={200} width={375} alt="logo" />
            </div>
          </Col>
          <Col className="gray" xl={6}>
            <Container className="h-100 d-flex align-items-center">
              <div className="p-5">
                <img src="https://logos-world.net/wp-content/uploads/2020/04/Twitter-Logo.png" height={50} width={100} alt="logo" />
                <h1 className="h1 text-white mt-1">You're almost done!</h1>
                <h2 className="h2 text-white">Click the button below to verify your account.</h2>
                <Button
                  className="font-weight-bolder d-block w-50 rounded-pill"
                  color="primary"
                  onClick={() => verifyEmail()}
                >Verify Account</Button>
              </div>
            </Container>
          </Col>
        </Row>
      </div>
    </>
  )
}