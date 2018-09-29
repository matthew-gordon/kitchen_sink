import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { ME_QUERY } from '../components/App'

const LOGOUT_MUTATION = gql`
  mutation logout {
    logout {
      id
      username
      email
      fullname
    }
  }
`

const LogoutButton = ({ history }) => {
  return (
    <Mutation
      mutation={LOGOUT_MUTATION}
      update={(store) => {
        const data = store.readQuery({ query: ME_QUERY })
        data.me = null
        store.writeQuery({ query: ME_QUERY, data })
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        history.push('/login')
      }}
    >
      {(logout, { client }) => (
        <button
          className="input is-primary"
          onClick={logout}
        >
          Logout
        </button>
      )}
    </Mutation >
  )
}

export default LogoutButton
