import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

function ToastComp(props) {

    return (
        <ToastContainer className="p-3 animate fadeIn position-fixed" position={props.position}>
            <Toast onClose={props.closeToast} animation variant={props.variant}>
                <Toast.Header>
                    <strong className="me-auto">Message</strong>
                </Toast.Header>
                <Toast.Body>{props.text}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default ToastComp