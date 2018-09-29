import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import DashboardScreen from '../screens/DashboardScreen'

import AuthRequired from '../components/hoc/AuthRequired'

export default [
  {
    path: '/',
    exact: true,
    name: 'home',
    component: HomeScreen,
  },
  {
    path: '/login',
    exact: true,
    name: 'login',
    component: LoginScreen,
  },
  {
    path: '/dashboard',
    exact: true,
    name: 'dashboard',
    component: AuthRequired(DashboardScreen),
  },
]
