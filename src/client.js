import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { withClientState } from 'apollo-link-state'
import { ApolloLink } from 'apollo-link'

const configureClient = () => {
  const token = localStorage.getItem('token') || null
  const refreshToken = localStorage.getItem('refreshToken') || null
  const cache = new InMemoryCache()


  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_SERVICE_URL,
  })

  const authLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        'x-access-token': `Bearer ${token}`,
        'x-refresh-token': `${refreshToken}`,
      },
    }
  })

  const stateLink = withClientState({
    cache,
    resolvers: {},
  })

  const client = new ApolloClient({
    link: ApolloLink.from([authLink, stateLink, httpLink]),
    cache,
  })

  return client
}

export default configureClient
