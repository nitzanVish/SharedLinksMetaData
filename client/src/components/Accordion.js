import React from 'react'
import { Accordion } from 'react-bootstrap'
import Card from './Card'

function AccordionComp(props) {
    return (
        <Accordion defaultActiveKey="0">
            { props.urlsData.map((obj, i) => 
                <Accordion.Item eventKey={i} key={i}>
                    <Accordion.Header>{obj.value.metadata.title || obj.value.metadata.website}</Accordion.Header>
                    <Accordion.Body>
                        <Card data={obj.value} parentCallback={props.parentCallback} />
                    </Accordion.Body>
                </Accordion.Item>
            )}
        </Accordion>
    )
}

export default AccordionComp
