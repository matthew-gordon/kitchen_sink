import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import LoginForm from '../components/forms/LoginForm'

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      fullname
      token
      refreshToken
    }
  }
`

class LoginScreen extends Component {
  render() {
    return (
      <Mutation
        mutation={LOGIN_USER}
      >
        {(login, { data, error, loading }) => {
          return (
            <section className="hero">
              {error && <p>{`${error}`}</p>}
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">Login</h1>
                  <LoginForm login={login} history={this.props.history} />
                </div>
              </div>
            </section>
          )
        }}
      </Mutation>
    )
  }
}

export default withRouter(LoginScreen)
