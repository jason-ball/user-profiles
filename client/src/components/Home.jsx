import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery, useQueryClient } from "react-query";
import { fetchUsers } from "../api";
import UserCard from "./UserCard";

function Home() {

  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery('users', fetchUsers);

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error}</span>
  }

  console.log(data)

  return (
    <Container>
      <h1>Hello World!</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {data.map((user) => (
          <Col key={user._id}>
            <UserCard name={user.name} bio={user.bio} image={user.imageURL} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Home;
