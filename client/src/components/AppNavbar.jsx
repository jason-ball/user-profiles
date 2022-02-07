import React from 'react';
import {
  Navbar,
  Container,
  Nav,
} from 'react-bootstrap';
import { useQuery } from 'react-query';
import { fetchProfile } from '../api';
import SignInButton from './SignInButton';
import UserButtons from './UserButtons';

export default function AppNavbar() {
  const { data } = useQuery('user', fetchProfile);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">User Profiles</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          {!data &&
            <SignInButton />
          }
          {data &&
            <UserButtons />
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}