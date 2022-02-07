import React from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';

export default function UserCard(props) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={3} className="d-flex flex-wrap align-items-center">
            <Image src={props.image} fluid roundedCircle />
          </Col>
          <Col>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
              {props.bio}
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}