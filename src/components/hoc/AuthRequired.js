import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import { ME_QUERY } from '../App';

export default (ComposedComponent, props) => {

  class Authentication extends Component {
    constructor(props) {
      super(props)

      const { me } = props.client.readQuery({ query: ME_QUERY })

      this.state = {
        user: me,
      }
    }

    componentWillMount() {
      const { user } = this.state

      if (!user) {
        this.props.history.push('/login')
      }
    }

    render() {
      const { user } = this.state

      if (!user) {
        return null
      }

      return (
        <ComposedComponent user={user} {...props} />
      )
    }
  }

  return withApollo(Authentication)
}