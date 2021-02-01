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
    ModalBody,
    ModalFooter
} from 'reactstrap'

export default function Login() {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <>
            {
                // localStorage.getItem('token') ? <Redirect to='/home' /> :
                    <div>
                        <Modal isOpen={modal} toggle={toggle}>
                            <div className="gray rounded-3">
                                <ModalHeader className="text-white">
                                    <div className="d-flex justify-content-between">
                                        <p>Create your account</p>
                                    </div>
                                </ModalHeader>
                                <Container>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg mt-2"
                                        placeholder="Name" />
                                    <input
                                        type="phone"
                                        className="form-control form-control-lg mt-3 mb-4"
                                        placeholder="Phone"
                                    />
                                    <p className="font-weight-bolder text-white mb-0">Date of Birth</p>
                                    <p className="text-muted">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
                                    <form>
                                        <div className="form-row">
                                            <div class="form-group col-md-5">
                                                <select
                                                    id="inputDay"
                                                    class="form-control 
                                                    form-control-lg">
                                                    <option selected>Month...</option>
                                                    <option>January</option>
                                                    <option>February</option>
                                                    <option>March</option>
                                                    <option>April</option>
                                                    <option>May</option>
                                                    <option>June</option>
                                                    <option>July</option>
                                                    <option>August</option>
                                                    <option>September</option>
                                                    <option>October</option>
                                                    <option>November</option>
                                                    <option>December</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-3">
                                                <select id="inputDay" class="form-control form-control-lg">
                                                    <option selected>Day...</option>
                                                    <option>...</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <input type="text" class="form-control form-control-lg" placeholder="Year" />
                                            </div>
                                        </div>

                                    </form>
                                </Container>
                                <ModalFooter>
                                    <Button className="float-right rounded-pill" color="primary">Next</Button>
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
                                        <Button className="font-weight-bolder d-block mt-3 w-50 rounded-pill text-white" color="primary" outline>Log in</Button>
                                    </div>
                                </Container>
                            </Col>
                        </Row>
                    </div>
            }
        </>
    )
}