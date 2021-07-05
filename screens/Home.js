import React from 'react'
import { View, Text, Platform, TouchableOpacity } from 'react-native'
import Colors from '../assets/color'
import { AuthContext } from '../context/AuthProvider'

const Home = ({ navigation, route }) => {
  const { user, logout } = React.useContext(AuthContext)
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          paddingHorizontal: 30,
          marginTop: Platform.OS == 'ios' ? 60 : 30,
          fontFamily: 'Montserrat-Bold',
          textAlign: 'center'
        }}
      >
        {user.uid}
      </Text>
      <TouchableOpacity
        style={{
          paddingHorizontal: 40,
          marginHorizontal: 30,
          marginTop: 30,
          flexDirection: 'row',
          justifyContent: 'center',
          paddingVertical: 10,
          backgroundColor: Colors.yellow[300],
          borderRadius: 10
        }}
        onPress={() => logout()}
      >
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            color: Colors.black,
            textTransform: 'uppercase'
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home
