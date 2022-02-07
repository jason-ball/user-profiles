import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { fetchProfile, fetchUsers } from "../api";
import UserCard from "./UserCard";

function Home() {

  const { isLoading, isError, data, error } = useQuery('users', fetchUsers);
  const profileQuery = useQuery('user', fetchProfile);

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error}</span>
  }

  return (
    <Container>
      <br />
      {profileQuery.data &&
        <h1>Welcome back, { profileQuery.data.name }!</h1>
      }
      {!profileQuery.data &&
        <h1>Welcome, please sign in.</h1>
      }
      <br />
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
