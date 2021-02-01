import { useState } from 'react'
import { Redirect } from 'react-router-dom'

// Library
import {
    Row,
    Col,
    Container,
    Button,
    Modal,
    ModalHeader,
    ModalFooter
} from 'reactstrap'

// Context
import User from '../utils/User/UserAPI/UserAPI'

export default function Login() {

    let year = new Date().getFullYear()
    const [modal, setModal] = useState(false);
    const [modalSteps, setModalSteps] = useState(1)

    const [registerState, setRegisterState] = useState({
        name: '',
        phone: '',
        day: 'Day...',
        month: 'Month...',
        year: ''
    })

    const [nameConfirm, setNameConfirm] = useState(false)
    const [phoneConfirm, setPhoneConfirm] = useState(false)
    const [yearConfirm, setYearConfirm] = useState(false)

    const findOneUser = () => {
        User.findUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTMwNzhiYzllZGM5NWE0NGQ3YjQwYyIsImlhdCI6MTYxMjIxNjUyM30.izDMwyU8L9DM1CqeFcjeiOqM5J5XsO66QACZFW0mAXQ')
            .then(({ data }) => {
                console.log(data)
            })
            .catch(err => console.log(err))
    }

    const register = () => {

        if (modalSteps === 1) {

            if (registerState.name === '') { setNameConfirm(true) }
            if (registerState.phone === '') { setPhoneConfirm(true) }
            if (year - registerState.year < 13) { setYearConfirm(true) }
            if (nameConfirm && phoneConfirm && yearConfirm) { setModalSteps(2) }
        }
    }

    const inputChange = (event) => {
        setRegisterState({ ...registerState, [event.target.name]: event.target.value })
    }

    const toggle = () => {
        setModalSteps(1)
        setModal(!modal)
    }

    return (
        <>
            {
                // localStorage.getItem('token') ? <Redirect to='/home' /> :
                <div>
                    <Modal isOpen={modal} toggle={toggle}>
                        <div className="gray">
                            <ModalHeader className="text-white">
                                <div className="d-flex justify-content-between">
                                    <p>Create your account</p>
                                </div>
                            </ModalHeader>
                            {
                                modalSteps === 1 ?
                                    <Container>
                                        <input
                                            type="text"
                                            className={`form-control form-control-lg mt-4 ${nameConfirm ? "is-invalid" : null }`}
                                            placeholder="Name"
                                            name="name"
                                            value={registerState.name}
                                            onChange={inputChange}
                                        />
                                        {
                                            nameConfirm ? <p className="text-danger">Please enter a valid Name.</p> : null
                                        }
                                        <input
                                            type="phone"
                                            className={`form-control form-control-lg mt-4 ${phoneConfirm ? "is-invalid" : null}`}
                                            placeholder="Phone"
                                            maxLength="10"
                                            name="phone"
                                            value={registerState.phone}
                                            onChange={inputChange}
                                        />
                                        {
                                            phoneConfirm ? <p className="text-danger">Please enter a valid Phone Number.</p> : null
                                        }
                                        <p className="font-weight-bolder text-white mt-4 mb-0">Date of Birth</p>
                                        <p className="text-muted">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
                                        {
                                            yearConfirm ? <p className="text-danger mt-2 mb-0">You must be 13 years or older to register on this site.</p> : null
                                        }
                                        <div className="form-row">
                                            <div className="form-group col-md-5">
                                                <select
                                                    className="form-control form-control-lg"
                                                    name="day"
                                                    value={registerState.day}
                                                    onChange={inputChange}
                                                >
                                                    <option value="January">January</option>
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
                                                    value={registerState.month}
                                                    onChange={inputChange}
                                                >
                                                    <option value={1}>1</option>
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
                                                    value={registerState.year}
                                                    onChange={inputChange}
                                                />
                                            </div>
                                        </div>
                                    </Container>
                                    :
                                    null
                            }
                            <ModalFooter>
                                {
                                    nameConfirm && phoneConfirm && yearConfirm ?
                                        <Button
                                            className="float-right rounded-pill"
                                            color="primary"
                                            onClick={() => register()}

                                        >Next
                                        </Button>
                                        :
                                        <Button
                                            className="float-right rounded-pill"
                                            color="primary"
                                            disabled
                                        >Next
                                        </Button>
                                }

                            </ModalFooter>
                        </div>
                    </Modal>
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
                                    <h1 className="h1 text-white mt-1">Nothings Happening Here</h1>
                                    <h2 className="h2 text-white">Join Re-twitter today.</h2>
                                    <Button
                                        className="font-weight-bolder d-block w-50 rounded-pill"
                                        color="primary"
                                        onClick={() => toggle()}
                                    >Sign up</Button>
                                    <Button
                                        className="font-weight-bolder d-block mt-3 w-50 rounded-pill text-white"
                                        color="primary"
                                        onClick={() => findOneUser()}
                                        outline
                                    >Log in</Button>
                                </div>
                            </Container>
                        </Col>
                    </Row>
                </div>
            }
        </>
    )
}