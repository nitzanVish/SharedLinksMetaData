import React from 'react'
import { useStores } from '../store/Root'
import { Card, Col, Row, Button, Image } from 'react-bootstrap'

const CardComp = (props) => {
    const { UserStore } = useStores();

    const handleDelete = () => {
        // Set ID to store
        UserStore.setData({key:'deleteUrl', value:props.data.id})
        // Delete URL from store
        const filteredUrls = UserStore.urlsMetaData.filter(obj => obj.value.metadata.website !== props.data.id)
        UserStore.setData({key:'urlsMetaData', value:filteredUrls})
        // Update parent
        props.parentCallback()
    }

    return (
        <>
            <Row>
                <Card bg={props.data.themeColor}>
                    <Row>
                        <Col>
                            <Card.Title className="pt-2"><span className='bg-primary rounded me-2 align-middle'><Image className="m-1 align-top" width="16" height="16" src={props.data.favicons[0]} /></span>{props.data.metadata.title}</Card.Title>
                        </Col>
                    </Row>
                    <Row className="align-items-top">
                        {props.data.metadata.banner && 
                        <Col md={4} xs={12}>
                            <Card.Body className='px-0'>
                                <Card.Img variant="top" src={props.data.metadata.banner} />
                            </Card.Body>
                        </Col>
                        }
                        <Col>
                            <Card.Body className='px-0'>
                                <Card.Text>{props.data.metadata.description}</Card.Text>
                                <p className="m-0"><a href={props.data.metadata.website} target="_blank" rel="noreferrer nofollow" className="text-muted small lh-1">{props.data.metadata.website}</a></p>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Row>
            <Row className="justify-content-end">
                <Button variant="secondary" onClick={handleDelete} className="mt-3 w-25">Delete</Button>
            </Row>
        </>
    )
}

export default CardComp