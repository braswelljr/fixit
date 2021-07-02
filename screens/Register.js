import React from 'react'
import {
  Text,
  ImageBackground,
  TextInput,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Animated,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native'
import Colors from '../assets/color'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Tabs from '../components/Tabs'

const Register = ({ navigation }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current
  const ScrollViewref = React.useRef()
  const onItemPress = React.useCallback(itemIndex => {
    ScrollViewref?.current?.scrollTo({
      x: itemIndex * Dimensions.get('screen').width,
      y: 0,
      animated: true
    })
  }, [])

  const data = [
    {
      title: 'Driver',
      ref: React.createRef()
    },
    {
      title: 'Mechanic',
      ref: React.createRef()
    }
  ]

  return (
    <ScrollView
      style={{
        flex: 1
      }}
    >
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: Platform.OS == 'ios' ? 50 : 25,
          left: 15,
          zIndex: 2
        }}
        onPress={() => navigation.goBack()}
      >
        <FeatherIcon
          name="chevron-left"
          style={{ marginLeft: 10 }}
          color={Colors.white}
          size={25}
        />
      </TouchableOpacity>
      <View
        style={{
          overflow: 'hidden'
        }}
      >
        <ImageBackground
          source={require('../assets/images/driver-ii.png')}
          style={{
            height: Dimensions.get('screen').height * 0.275,
            position: 'relative'
          }}
        >
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,0.7)',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                color: Colors.white,
                fontFamily: 'MontserratAlternates-Bold',
                fontSize: 35,
                textTransform: 'uppercase'
              }}
            >
              Register
            </Text>
          </View>
        </ImageBackground>
      </View>

      {/* Form Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          alignSelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Header Tabs */}
        <Tabs data={data} scrollX={scrollX} onItemPress={onItemPress} />
        {/* ScrollView */}
        <Animated.ScrollView
          ref={ScrollViewref}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: scrollX }
                }
              }
            ],
            { useNativeDriver: false }
          )}
          bounces={false}
        >
          {/* Driver's form */}
          <View
            style={{
              backgroundColor: Colors.sky[500],
              width: Dimensions.get('screen').width,
              height: 555
            }}
          >
            <Text>Driver</Text>
          </View>
          <View
            style={{
              backgroundColor: Colors.pink[800],
              width: Dimensions.get('screen').width
            }}
          >
            <Text>Mechanic</Text>
          </View>
        </Animated.ScrollView>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default Register
