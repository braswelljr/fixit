/**
 * App entry
 *
 */
import 'react-native-gesture-handler'
import React from 'react'
import auth from '@react-native-firebase/auth'
import { AuthContext } from './context/AuthProvider'
import AuthStack from './navigation/AuthStack'
import AppStack from './navigation/AppStack'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
  const { user, setUser } = React.useContext(AuthContext)
  const [initializing, setInitializing] = React.useState(true)

  const onAuthStateChanged = user => {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  if (initializing) return null

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default App
