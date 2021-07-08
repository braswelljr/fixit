/**
 * App entry
 *
 */
import 'react-native-gesture-handler'
import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import auth from '@react-native-firebase/auth'
import { AuthContext } from './context/AuthProvider'
import AuthStack from './navigation/AuthStack'
import AppStack from './navigation/AppStack'
import { NavigationContainer } from '@react-navigation/native'
import Colors from './assets/color'

const App = () => {
  const { user, setUser } = React.useContext(AuthContext)
  const [initializing, setInitializing] = React.useState(true)

  React.useEffect(() => {
    const onAuthStateChanged = user => {
      setUser(user)
      if (initializing) {
        setTimeout(() => {
          setInitializing(false)
        }, 1000)
      }
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  if (initializing) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator size="large" color={Colors.sky[900]} />
      </View>
    )
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default App
