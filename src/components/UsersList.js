import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const GET_USERS = gql`
  query getAllUsers {
    getAllUsers {
      id
      username
      email
      fullname
    }
  }
`

const UsersList = () => (
  <Query query={GET_USERS}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>

      return data.getAllUsers.map(user => (
        <div key={user.id} className={'box title is-4'}>
          <p>{user.username}</p>
        </div>
      ))
    }}
  </Query>
)

export default UsersList
