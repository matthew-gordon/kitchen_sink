import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import LogoutButton from '../components/LogoutButton'

class DashboardScreen extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard Screen</h1>
        <LogoutButton history={this.props.history} />
      </div>
    )
  }
}

export default withRouter(DashboardScreen)
