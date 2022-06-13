
import React, {useState} from 'react'
import { Modal, Button, Row, Col, Image } from 'react-bootstrap'

function ModalComp(props) {
    const [show, setShow] = useState(false);

    if(show !== props.showModal) {
        setShow(props.showModal)
    }
    
    const handleClose = () => {
        setShow(false)
        props.parentCallback()
    }

    return (
        <>
            {   props.data && Object.keys(props.data).length > 0 && 
                <Modal show={show} onHide={handleClose} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.data.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="align-items-top">
                            { props.data.banner && 
                                <Col md={4} xs={12}>
                                    <p className='px-0'>
                                        <Image className="img-fluid" src={props.data.banner} />
                                    </p>
                                </Col>
                            }
                            <Col>
                                <p className='px-0'>
                                    <p>{props.data.description}</p>
                                    <p className="m-0"><a href={props.data.website} target="_blank" rel="noreferrer nofollow" className="text-muted small lh-1">{props.data.website}</a></p>
                                </p>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row className="w-100">
                            <Col xs={9} className="p-0">
                                <p className="m-0 fw-bold text-success">
                                    The URL was added successfully...
                                </p>
                            </Col>
                            <Col xs={3} className="text-end p-0">
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
            }
        </>
    )
}

export default ModalComp
