import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import renderer from 'react-test-renderer'
import wait from 'waait'

import UsersList, { GET_USERS } from '../UsersList'

// mock users list response
const userListMock = {
  request: {
    query: GET_USERS,
  },
  result: {
    data: {
      getAllUsers: [
        {
          id: '345ae4d0-f2c3-4342-91a2-5b45cb8db57f',
          username: 'admin',
          email: '',
          fullname: 'ADMIN YO ASS',
        },
        {
          id: '16c1ef84-df72-4be1-ad46-1168ee53cd60',
          username: 'matt',
          email: 'boowahTak@aks.com',
          fullname: 'Takea Notha Hit',
        },
      ],
    },
  },
}

// create test component for MockProvider with UsersList
const TestComponent = mocks => {
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UsersList />
    </MockedProvider>
  )

  return component
}

describe('UsersList', () => {
  test('UserList renders loading state', () => {
    const component = TestComponent([userListMock])
    const p = component.root.findAllByType('p')

    expect(p.length).toBe(1)
    expect(p[0].children).toContain('Loading...')
  })

  test('UsersList renders error state', async () => {
    const errorMock = {
      request: {
        query: GET_USERS,
      },
      error: new Error('aw shucks... error...'),
    }
    const component = TestComponent([errorMock])

    await wait(0)

    const tree = component.toJSON()
    expect(tree.children).toContain('Error :(')
  })

  test('UsersList renders properly', async () => {
    const component = TestComponent([userListMock])

    await wait(0)

    const p = component.root.findAllByType('p')

    expect(p.length).toBe(2)
    expect(p[0].children).toContain('admin')
    expect(p[1].children).toContain('matt')
  })

  test('renders a snapshot properly', async () => {
    const component = TestComponent([userListMock])

    await wait(0)

    expect(component).toMatchSnapshot()
  })
})
