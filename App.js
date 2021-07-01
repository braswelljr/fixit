/**
 * App entry
 *
 */
import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { HorizontalAnimation } from './animations'
import Index from './screens/Index'
import Signup from './screens/Signup'
import Login from './screens/Login'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Index"
          component={Index}
          options={{
            title: 'Welcome',
            headerShown: false,
            ...HorizontalAnimation
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            title: 'Welcome',
            headerShown: false,
            ...HorizontalAnimation
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Welcome',
            headerShown: false,
            ...HorizontalAnimation
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
