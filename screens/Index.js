import React from 'react'
import {
  Text,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import Colors from '../assets/color'

const Index = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <ImageBackground
        source={require('../assets/images/mechanic-1.jpg')}
        style={{ flex: 1, resizeMode: 'cover' }}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            flex: 1,
            resizeMode: 'cover',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingVertical: 40,
            backgroundColor: 'rgba(0,0,0,0.7)'
          }
        ]}
      >
        <View style={{ padding: 30 }}>
          <View>
            <Image
              source={require('../assets/images/fixit-light.png')}
              style={{ width: 90, height: 60 }}
            />
            <Text
              style={{
                marginTop: 20,
                fontSize: 18,
                color: Colors.white,
                fontFamily: 'Montserrat-Medium'
              }}
            >
              Let's get you fixed with a tap. Get to signup as a car owner, a
              driver or a mechanic.
            </Text>
          </View>
          {/* Call to Actions */}
          <View style={{ marginTop: 40 }}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.white,
                paddingVertical: 7.5,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 7,
                alignSelf: 'center'
              }}
              onPress={() => navigation.navigate('Login')}
            >
              <Text
                style={{
                  color: Colors.black,
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 16,
                  textTransform: 'uppercase'
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(0,0,0,0.1)',
                paddingVertical: 7.5,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 7,
                alignSelf: 'center',
                marginTop: 20,
                borderWidth: 0.5,
                borderColor: Colors.white
              }}
              onPress={() => navigation.navigate('Register')}
            >
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 16,
                  textTransform: 'uppercase'
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index
