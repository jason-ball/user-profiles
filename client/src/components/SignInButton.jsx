import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default class SignInButton extends Component {
  render() {
    return (
      <Button variant="dark" onClick={this.handleSignInClick}>
        <FontAwesomeIcon icon={faGithub} /> Sign In With GitHub
      </Button>
    )
  }

  async handleSignInClick() {
    const serverURL = process.env.REACT_APP_SERVER_URL ?? 'http://localhost:4200'
    window.location.href = `${serverURL}/auth/github`
  }
}