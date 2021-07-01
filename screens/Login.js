import React from 'react'
import {
  Text,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native'
import Colors from '../assets/color'
import FeatherIcon from 'react-native-vector-icons/Feather'

const Login = ({ navigation }) => {
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
            justifyContent: 'space-around',
            paddingVertical: 40,
            backgroundColor: 'rgba(0,0,0,0.5)'
          }
        ]}
      >
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: Platform.OS == 'ios' ? 50 : 30,
            left: 20
          }}
          onPress={() => navigation.goBack()}
        >
          <FeatherIcon
            name="chevron-left"
            style={{ marginLeft: 10 }}
            color={Colors.white}
            size={20}
          />
        </TouchableOpacity>
        <View style={{ marginTop: 50, paddingHorizontal: 30 }}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.white,
              paddingVertical: 7.5,
              width: '70%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              alignSelf: 'center'
            }}
          >
            <Text
              style={{
                color: Colors.black,
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 20,
                textTransform: 'uppercase'
              }}
              onPress={() => navigation.navigate('Sview')}
            >
              Next
            </Text>
            <FeatherIcon
              name="chevron-right"
              style={{ marginLeft: 10 }}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Login
