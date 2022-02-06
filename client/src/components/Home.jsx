import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      users: []
    };
  }

  async loadProfile() {
    const serverURL = process.env.REACT_APP_SERVER_URL ?? 'http://localhost:4200';
    try {
      const response = await fetch(`${serverURL}/user/profile`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        }
      });
      const responseJSON = await response.json();
      this.setState({ user: responseJSON });
    } catch (e) {
      console.error(e);
    }
  }

  async componentDidMount() {
    const serverURL = process.env.REACT_APP_SERVER_URL ?? 'http://localhost:4200';
    try {
      const response = await fetch(`${serverURL}/user/all`);
      const responseJSON = await response.json();
      this.setState({ users: responseJSON });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <>
        <h1>Hello World!</h1>
        <ul>
        {
          this.state.users.map((value) => {
            return <li key={value._id}>name: { value.name }, bio: { value.bio }</li>
          })
        }
        </ul>
      </>
    )
  }
}

export default Home;
