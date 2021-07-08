/**
 * @format
 * Application entry
 */
import { AppRegistry } from 'react-native'
import React from 'react'
import App from './src/App'
import { name as appName } from './app.json'
import { AuthProvider } from './src/context/AuthProvider'

const index = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
)

AppRegistry.registerComponent(appName, () => index)
