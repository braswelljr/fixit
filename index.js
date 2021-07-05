/**
 * @format
 * Application entry
 */
import { AppRegistry } from 'react-native'
import React from 'react'
import App from './App'
import { name as appName } from './app.json'
import { AuthProvider } from './context/AuthProvider'

const index = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
)

AppRegistry.registerComponent(appName, () => index)
