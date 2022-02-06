import React, { Component } from "react";

class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: undefined
    }
  }

  componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = urlSearchParams.entries();
    this.setState({ response: params });
  }

  render() {
    return (
      <p>{ this.state.response }</p>
    )
  }
}

export default Callback;
