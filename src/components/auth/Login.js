import React, { Component } from "react";
import Axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorText: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: ""
    });
  }
  handleSubmit(event) {
    Axios.post(
      "https://api.devcamp.space/sessions",
      {
        client: {
          email: this.state.email,
          password: this.state.password
        }
      },
      { withCredentials: true }
    )
      .then(response => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth();
        } else {
          this.setState({
            errorText: "Wrong email or password"
          });
          this.props.handleUnSuccessfulAuth();
        }
      })
      .catch(error => {
        this.setState({
          errorText: "An has error occurred"
        });
        this.props.handleUnSuccessfulAuth();
      });

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>LOGIN TO YOUR DASHBOARD HERE, GIRL</h1>

        <div>{this.state.errorText}</div>

        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={this.state.email}
            onChange={this.handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="your password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <div>
            <button type="submit">LOGIN</button>
          </div>
        </form>
      </div>
    );
  }
}
