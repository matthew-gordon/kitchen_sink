import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class HomeScreen extends Component {
  render() {
    return (
      <div>
        <h1>Home Screen</h1>
      </div>
    )
  }
}

export default withRouter(HomeScreen)
