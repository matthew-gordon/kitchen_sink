import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import routes from '../routes'

import NavBar from './navbar/NavBar'

export const ME_QUERY = gql`
  query me {
    me {
      id
      username
      email
      fullname
    }
  }
`

class App extends Component {
  render() {
    return (
      <Query query={ME_QUERY}>
        {({ loading, error, data: { me } }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>

          return (
            <React.Fragment>
              <NavBar appName={'lyfted'} currentUser={me} />

              <div className="main-content">
                <Switch>
                  {routes.map(route => (
                    <Route key={route.name} {...route} {...this.props} />
                  ))}
                </Switch>
              </div>
            </React.Fragment>
          )
        }}
      </Query>
    )
  }
}

export default App
