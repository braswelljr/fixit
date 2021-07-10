/**
 * App entry
 *
 */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HorizontalAnimation } from '../animations'
import Home from '../screens/Home'
import ProfileEditor from '../screens/ProfileEditor'

const Stack = createStackNavigator()

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Welcome',
          headerShown: false,
          ...HorizontalAnimation
        }}
      />
      <Stack.Screen
        name="ProfileEditor"
        component={ProfileEditor}
        options={{
          title: 'Edit Profile',
          headerShown: false,
          ...HorizontalAnimation
        }}
      />
    </Stack.Navigator>
  )
}

export default AppStack
