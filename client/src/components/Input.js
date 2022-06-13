import React, {useState} from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import validUrl from 'valid-url'

function AccordionComp(props) {
    const [enableBtn, setUnableBtn] = useState(false);
    const [isValidUrl, setIsValidUrl] = useState(''); 
    const [urlVal, setUrlVal] = useState('');

    const addUrl = (event) => {
        event.preventDefault();
        //Update Parent with new url
        props.parentCallback(urlVal)
    }

    const handleChange = (event) => {
        if(event.target.value) setUrlVal(event.target.value)
        // Url validation
        if(!validUrl.isWebUri(event.target.value)){
            setIsValidUrl(false)
            setUnableBtn(false)
            return
        }
        setIsValidUrl(true)
        setUnableBtn(true)
    }

    return (
        <Form>
            <Row className="justify-content-end">
                <Col col={5}>
                    <Form.Group className="mb-3" controlId="addUrl">
                        <Form.Control type="text" placeholder="Add Url" onChange={handleChange}/>
                    </Form.Group>
                </Col>
                <Col col={3}>
                    <Button variant="primary" type="submit" disabled={!enableBtn} onClick={addUrl}>
                        { !props.isLoading ? 'Add' : '' }
                        { props.isLoading && <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading </>}
                    </Button>
                </Col>
            </Row>
            { isValidUrl === false && <Form.Control.Feedback type="invalid">
                Please provide a valid url.
            </Form.Control.Feedback>}
      </Form>
    )
}

export default AccordionComp




