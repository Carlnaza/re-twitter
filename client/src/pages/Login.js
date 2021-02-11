import { Redirect } from 'react-router-dom'

// Library
import {
    Row,
    Col,
    Container,
    Button,
    Modal,
    ModalHeader,
    ModalFooter,
    Alert
} from 'reactstrap'

// Utils
import FormContext from '../utils/FormContext.js'

export default function Login() {

    const {
        handleRegisterInputChange,
        handleLoginInputChange,
        handleSubmit,
        handleLogin,
        loginValues,
        values,
        errors,
        disabled,
        registerStatus,
        modal,
        setModal,
        success
    } = FormContext()

    const toggle = () => {
        setModal(!modal)
    }

    return (
        <>
            {
                localStorage.getItem('token') ? <Redirect to='/home' /> :
                    <div>
                        <Modal isOpen={modal} toggle={toggle}>
                            <div className="gray">
                                <ModalHeader className="text-white">
                                    <div className="d-flex justify-content-between">
                                        <p>Create your account</p>
                                    </div>
                                </ModalHeader>
                                <Container>
                                    {
                                        registerStatus && <Alert className="success mt-3">Registration successful! You can now log in.</Alert>
                                    }
                                    <input
                                        type="text"
                                        className="form-control form-control-lg mt-4"
                                        placeholder="Username"
                                        name="username"
                                        value={values.username}
                                        disabled={disabled ? true : false}
                                        onChange={handleRegisterInputChange}
                                    />
                                    {
                                        errors.username && <p className="text-danger">{errors.username}</p>
                                    }
                                    {
                                        errors.usernameExists && <Alert color="danger" className="mt-3">{errors.usernameExists}</Alert>
                                    }
                                    <input
                                        type="text"
                                        className="form-control form-control-lg mt-4"
                                        placeholder="Full Name"
                                        name="name"
                                        value={values.name}
                                        disabled={disabled ? true : false}
                                        onChange={handleRegisterInputChange}
                                    />
                                    {
                                        errors.name && <p className="text-danger">{errors.name}</p>
                                    }
                                    <input
                                        type="tel"
                                        className="form-control form-control-lg mt-4"
                                        maxLength="10"
                                        placeholder="Phone"
                                        name="phone"
                                        value={values.phone}
                                        onChange={handleRegisterInputChange}
                                        disabled={disabled ? true : false}
                                    />
                                    {
                                        errors.phoneExists && <Alert color="danger" className="mt-3">{errors.phoneExists}</Alert>
                                    }
                                    {
                                        errors.phone && <p className="text-danger">{errors.phone}</p>
                                    }
                                    <input
                                        type="text"
                                        className="form-control form-control-lg mt-4"
                                        placeholder="Email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleRegisterInputChange}
                                        disabled={disabled ? true : false}
                                    />
                                    {
                                        errors.emailExists && <Alert color="danger" className="mt-3">{errors.emailExists}</Alert>
                                    }
                                    {
                                        errors.email && <p className="text-danger">{errors.email}</p>
                                    }
                                    <input
                                        type="password"
                                        className="form-control form-control-lg mt-4"
                                        placeholder="Password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleRegisterInputChange}
                                        disabled={disabled ? true : false}
                                    />
                                    {
                                        errors.password && <p className="text-danger">{errors.password}</p>
                                    }
                                    <input
                                        type="password"
                                        className="form-control form-control-lg mt-4"
                                        placeholder="Repeat Password"
                                        name="password2"
                                        value={values.password2}
                                        onChange={handleRegisterInputChange}
                                        disabled={disabled ? true : false}
                                    />
                                    {
                                        errors.password2 && <p className="text-danger">{errors.password2}</p>
                                    }
                                    <p className="font-weight-bolder text-white mb-0 mt-4">Date of Birth</p>
                                    <p className="text-muted">This information will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
                                    {
                                        errors.year && <p className="text-danger mt-2 mb-0">{errors.year}</p>
                                    }
                                    <div className="form-row">
                                        <div className="form-group col-md-5">
                                            <select
                                                className="form-control form-control-lg"
                                                name="day"
                                                value={values.day}
                                                onChange={handleRegisterInputChange}
                                                disabled={disabled ? true : false}
                                            >
                                                <option defaultValue="January">January</option>
                                                <option value="February">February</option>
                                                <option value="March">March</option>
                                                <option value="April">April</option>
                                                <option value="May">May</option>
                                                <option value="June">June</option>
                                                <option value="July">July</option>
                                                <option value="August">August</option>
                                                <option value="September">September</option>
                                                <option value="October">October</option>
                                                <option value="November">November</option>
                                                <option value="December">December</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <select
                                                className="form-control form-control-lg"
                                                name="month"
                                                value={values.month}
                                                onChange={handleRegisterInputChange}
                                                disabled={disabled ? true : false}
                                            >
                                                <option defaultValue={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                                <option value={6}>6</option>
                                                <option value={7}>7</option>
                                                <option value={8}>8</option>
                                                <option value={9}>9</option>
                                                <option value={10}>10</option>
                                                <option value={11}>11</option>
                                                <option value={12}>12</option>
                                                <option value={13}>13</option>
                                                <option value={14}>14</option>
                                                <option value={15}>15</option>
                                                <option value={16}>16</option>
                                                <option value={17}>17</option>
                                                <option value={18}>18</option>
                                                <option value={19}>19</option>
                                                <option value={20}>20</option>
                                                <option value={21}>21</option>
                                                <option value={22}>22</option>
                                                <option value={23}>23</option>
                                                <option value={24}>24</option>
                                                <option value={25}>25</option>
                                                <option value={26}>26</option>
                                                <option value={27}>27</option>
                                                <option value={28}>28</option>
                                                <option value={29}>29</option>
                                                <option value={30}>30</option>
                                                <option value={31}>31</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                placeholder="Year"
                                                maxLength="4"
                                                name="year"
                                                value={values.year}
                                                onChange={handleRegisterInputChange}
                                                disabled={disabled ? true : false}
                                            />
                                        </div>
                                    </div>
                                </Container>
                                <ModalFooter>
                                    {success ?
                                        <Button
                                            className="float-right rounded-pill"
                                            color="success"
                                            disabled>
                                            Success
                                    </Button> :
                                        <button
                                            className="btn btn-primary float-right rounded-pill"
                                            onClick={() => handleSubmit()}
                                            disabled={disabled ? true : false}>
                                            {disabled ?
                                                <>
                                                    <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                                    <span>Loading...</span>
                                                </>
                                                :
                                                <span>Register</span>
                                            }
                                        </button>
                                    }
                                </ModalFooter>
                            </div>
                        </Modal>
                        {/* ----------------------------------------------- End Modal ----------------------------------------------- */}
                        {!loginValues.isLogging ?
                            <Row className="max-screen">
                                <Col className="black" xl={7}>
                                    <div className="h-100 d-flex justify-content-center align-items-center">
                                        <img src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c53e.png" height={400} width={400} alt="logo" />
                                    </div>
                                </Col>
                                <Col className="gray" xl={5}>
                                    <Container className="h-100 d-flex align-items-center">
                                        <div className="p-5">
                                            <img src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c53e.png" height={75} width={75} alt="logo" />
                                            <h1 className="h1 text-white mt-4 whats-happening">Nothings Happening Here</h1>
                                            <h2 className="h2 mt-5 mb-4 text-white">Join Re-twitter today.</h2>
                                            {
                                                success && <Alert className="success">Registration successful! You can now log in.</Alert>
                                            }
                                            <Button
                                                className="font-weight-bolder d-block w-50 rounded-pill"
                                                color="primary"
                                                onClick={() => toggle()}
                                            >Sign up</Button>
                                            <Button
                                                className="font-weight-bolder d-block mt-3 w-50 rounded-pill text-white"
                                                color="primary"
                                                onClick={() => handleLogin()}
                                                outline
                                            >Log in</Button>
                                        </div>
                                    </Container>
                                </Col>
                            </Row> :
                            <Container>
                                <div className="d-flex justify-content-center">
                                    <div className="login-form">
                                        <img src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c53e.png" height={75} width={75} alt="logo" />
                                        <p className="h1 text-white text-bold">Login to Re-Twitter</p>
                                        <div className="p-2">
                                            {
                                                success && <Alert color="success">You are now logged in! You will be redirected soon.</Alert>
                                            }
                                            {
                                                errors.loginUsername && <Alert color="danger">{errors.loginUsername}</Alert>
                                            }
                                            {
                                                errors.loginPassword && <Alert color="danger">{errors.loginPassword}</Alert>
                                            }
                                            <input
                                                type="input"
                                                className="form-control form-control-lg mt-4 black"
                                                placeholder="Username"
                                                name="loginUsername"
                                                value={loginValues.username}
                                                onChange={handleLoginInputChange}
                                                disabled={disabled ? true : false}
                                            />

                                            <input
                                                type="password"
                                                className="form-control form-control-lg mt-4 black"
                                                placeholder="Password"
                                                name="loginPassword"
                                                value={loginValues.password}
                                                onChange={handleLoginInputChange}
                                                disabled={disabled ? true : false}
                                            />

                                        </div>
                                        <Button
                                            className="font-weight-bolder d-block mt-3 w-100 rounded-pill text-white login-btn"
                                            color={success ? "success" : "primary"}
                                            onClick={() => handleLogin()}
                                            disabled={disabled ? true : false}
                                        >
                                            {disabled ?
                                                <>
                                                    <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                                    <span>Loading...</span>
                                                </>
                                                :
                                                <span>Login</span>
                                            }
                                        </Button>
                                        <p className="text-center text-white mt-4">
                                            <a href="#">Forgot password?</a> · <a href="/login">Sign up for Re-Twitter</a>
                                        </p>
                                    </div>
                                </div>
                            </Container>
                        }
                    </div>
            }
        </>
    )
}