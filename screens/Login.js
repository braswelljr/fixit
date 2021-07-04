import React from 'react'
import {
  Text,
  ImageBackground,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
  Keyboard,
  Animated,
  View,
  TouchableOpacity,
  Platform
} from 'react-native'
import Colors from '../assets/color'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Tabs from '../components/Tabs'
import { usekeyboardHeight } from '../hooks/usekeyboard'
import firestore from '@react-native-firebase/firestore'

const Login = ({ navigation }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current
  const ScrollViewref = React.useRef()
  const scrollContainerRef = React.useRef()
  const keyboardShowRef = React.useRef()
  const [keyboardShowView, setKeyboardShowView] = React.useState(0)

  const [showAlert, setShowAlert] = React.useState({
    alert: false,
    message: ''
  })
  // driver
  const [uEmail, setUEmail] = React.useState({
    email: '',
    message: ''
  })
  const [uPassword, setUPassword] = React.useState({
    password: '',
    message: ''
  })
  const [ushowPassword, setUShowPassword] = React.useState(true)

  // mechanic
  const [mEmail, setMEmail] = React.useState({
    email: '',
    message: ''
  })
  const [mPassword, setMPassword] = React.useState({
    password: '',
    message: ''
  })
  const [mshowPassword, setMShowPassword] = React.useState(true)

  const onItemPress = React.useCallback(itemIndex => {
    ScrollViewref?.current?.scrollTo({
      x: itemIndex * Dimensions.get('screen').width,
      y: 0,
      animated: true
    })
  }, [])
  // keyboard height
  const keyboardHeight = usekeyboardHeight()

  // keyboard listener

  React.useEffect(() => {
    const onKeyboardDidShow = () => {
      scrollContainerRef.current.scrollTo({
        x: 0,
        y: keyboardShowView,
        animated: true
      })
    }
    const onKeyboardDidHide = () => {
      scrollContainerRef.current.scrollTo({
        x: 0,
        y: 0,
        animated: true
      })
    }
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow)
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide)
  }, [keyboardShowView])

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
      ref={scrollContainerRef}
      style={{
        backgroundColor: Colors.white,
        flex: 1,
        minHeight: Dimensions.get('screen').height
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
          source={require('../assets/images/mechanic-i.jpg')}
          style={{
            height: Dimensions.get('screen').height * 0.37,
            position: 'relative'
          }}
        >
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,0.4)',
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
              Login
            </Text>
          </View>
        </ImageBackground>
      </View>

      {/* Form Area */}

      <View
        ref={keyboardShowRef}
        onLayout={event => {
          setKeyboardShowView(event.nativeEvent.layout.y)
          console.log(keyboardShowView)
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
          style={{}}
        >
          {/**
           * Driver or car owners form
           */}
          <View
            style={{
              width: Dimensions.get('screen').width
            }}
          >
            <View
              style={{
                paddingHorizontal: 30,
                paddingVertical: 5,
                marginTop: 20
              }}
            >
              {/* Google Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.yellow[100],
                  paddingVertical: 10,
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 7,
                  alignSelf: 'center'
                }}
              >
                <Image
                  source={require('../assets/images/google.png')}
                  style={{ height: 15, width: 15 }}
                />
                <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    textTransform: 'uppercase',
                    paddingLeft: 20
                  }}
                >
                  Login with Google
                </Text>
              </TouchableOpacity>

              {/* or */}
              <View
                style={{
                  position: 'relative',
                  marginTop: 10,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 18
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.trueGray[200],
                    width: '100%',
                    height: 1
                  }}
                />
                <Text
                  style={{
                    position: 'absolute',
                    fontSize: 12,
                    fontFamily: 'Montserrat-SemiBold',
                    backgroundColor: Colors.white,
                    paddingHorizontal: 10
                  }}
                >
                  or
                </Text>
              </View>

              {/**
               * Driver or car owners form
               * Inputs
               */}
              <View style={{ marginTop: 20 }}>
                {/*
                 * Username or email field
                 */}
                <View style={{ position: 'relative' }}>
                  <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
                    Email
                  </Text>
                  <TextInput
                    value={uEmail.email}
                    placeholder="johndoe@gmail.com"
                    placeholderTextColor={Colors.trueGray[400]}
                    autoCapitalize="none"
                    onChangeText={e =>
                      setUEmail({
                        email: e,
                        message:
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e)
                            ? 'Good 😎'
                            : "Doesn't look like a valid email☹️"
                      })
                    }
                    style={{
                      borderWidth: 0.5,
                      borderColor:
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                          uEmail
                        )
                          ? ''
                          : Colors.red[500],
                      padding: 7,
                      color: Colors.black,
                      borderRadius: 7,
                      marginVertical: 2.5,
                      fontFamily: 'Montserrat-SemiBold'
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      color: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        uEmail
                      )
                        ? ''
                        : Colors.red[500]
                    }}
                  >
                    {uEmail.message}
                  </Text>
                </View>
                {/*
                 *Password Field
                 */}
                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
                    Password
                  </Text>
                  <View
                    style={{
                      marginVertical: 2.5,
                      position: 'relative',
                      height: 45,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      overflow: 'hidden',
                      borderWidth: 0.5,
                      borderRadius: 7
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        zIndex: 1,
                        right: 5,
                        padding: 4
                      }}
                      onPress={() => setUShowPassword(!ushowPassword)}
                    >
                      <MaterialIcon
                        name={ushowPassword ? 'eye' : 'eye-off'}
                        size={25}
                      />
                    </TouchableOpacity>
                    <TextInput
                      value={uPassword.password}
                      placeholder="********"
                      placeholderTextColor={Colors.trueGray[400]}
                      autoCapitalize="none"
                      secureTextEntry={ushowPassword}
                      onChangeText={e => setUPassword(e)}
                      style={{
                        padding: 7,
                        color: Colors.black,
                        fontFamily: 'Montserrat-SemiBold',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0
                      }}
                    />
                  </View>
                  <Text style={{ fontFamily: 'Montserrat-Regular' }}>
                    {uPassword.message}
                  </Text>
                </View>
                {/*
                 *Submit Button
                 */}
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.yellow[100],
                    paddingVertical: 10,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 7,
                    alignSelf: 'center',
                    marginTop: 20
                  }}
                  onPress={() => {
                    console.log('hey')
                    // firestore()
                    //   .collection('users')
                    //   .where('email', '==', `braswellkenneth7@gmail.com`)
                    //   .get()
                    //   .then(res => console.log(res))
                    //   .catch(error => console.error(error))

                    firestore()
                      .collection('users')
                      .add({
                        avatar: '',
                        name: 'KB',
                        email: 'kb@gmail.com',
                        phone: '555',

                        password: 'password'
                      })
                      .then(() => console.log('Sign up successful!'))
                      .catch(error => console.error(error))
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      textTransform: 'uppercase'
                    }}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/**
           * Mechanical Tab
           */}
          <View
            style={{
              width: Dimensions.get('screen').width
            }}
          >
            <View
              style={{
                paddingHorizontal: 30,
                paddingVertical: 5,
                marginTop: 20
              }}
            >
              {/* Google Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.yellow[100],
                  paddingVertical: 10,
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 7,
                  alignSelf: 'center'
                }}
              >
                <Image
                  source={require('../assets/images/google.png')}
                  style={{ height: 15, width: 15 }}
                />
                <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    textTransform: 'uppercase',
                    paddingLeft: 20
                  }}
                >
                  Login with Google
                </Text>
              </TouchableOpacity>

              {/* or */}
              <View
                style={{
                  position: 'relative',
                  marginTop: 10,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 18
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.trueGray[200],
                    width: '100%',
                    height: 1
                  }}
                />
                <Text
                  style={{
                    position: 'absolute',
                    fontSize: 12,
                    fontFamily: 'Montserrat-SemiBold',
                    backgroundColor: Colors.white,
                    paddingHorizontal: 10
                  }}
                >
                  or
                </Text>
              </View>

              {/**
               * Mechanic form
               * Inputs
               */}
              <View style={{ marginTop: 20 }}>
                {/*
                 * Mechanic or email field
                 */}
                <View style={{ position: 'relative' }}>
                  <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
                    Email
                  </Text>
                  <TextInput
                    value={mEmail.email}
                    placeholder="janedoe@gmail.com"
                    placeholderTextColor={Colors.trueGray[400]}
                    autoCapitalize="none"
                    onChangeText={e =>
                      setMEmail({
                        email: e,
                        message:
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e)
                            ? 'Good 😎'
                            : "Doesn't look like a valid email☹️"
                      })
                    }
                    style={{
                      borderWidth: 0.5,
                      borderColor:
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                          mEmail
                        )
                          ? ''
                          : Colors.red[500],
                      padding: 7,
                      color: Colors.black,
                      borderRadius: 7,
                      marginVertical: 2.5,
                      fontFamily: 'Montserrat-SemiBold'
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      color: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        uEmail
                      )
                        ? ''
                        : Colors.red[500]
                    }}
                  >
                    {uEmail.message}
                  </Text>
                </View>
                {/*
                 *Password Field
                 */}
                <View style={{ marginTop: 15 }}>
                  <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
                    Password
                  </Text>
                  <View
                    style={{
                      marginVertical: 2.5,
                      position: 'relative',
                      height: 45,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      overflow: 'hidden',
                      borderWidth: 0.5,
                      borderRadius: 7
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        zIndex: 1,
                        right: 5,
                        padding: 4
                      }}
                      onPress={() => setMShowPassword(!mshowPassword)}
                    >
                      <MaterialIcon
                        name={mshowPassword ? 'eye' : 'eye-off'}
                        size={25}
                      />
                    </TouchableOpacity>
                    <TextInput
                      value={mPassword.password}
                      placeholder={mshowPassword ? '********' : '&%gr4xcw'}
                      placeholderTextColor={Colors.trueGray[400]}
                      autoCapitalize="none"
                      secureTextEntry={mshowPassword}
                      onChangeText={e => setMPassword(e)}
                      style={{
                        padding: 7,
                        color: Colors.black,
                        fontFamily: 'Montserrat-SemiBold',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0
                      }}
                    />
                  </View>
                  <Text style={{ fontFamily: 'Montserrat-Regular' }}>
                    {mPassword.message}
                  </Text>
                </View>
                {/*
                 *Submit Button
                 */}
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.yellow[100],
                    paddingVertical: 10,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 7,
                    alignSelf: 'center',
                    marginTop: 15
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      textTransform: 'uppercase',
                      paddingLeft: 20
                    }}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.ScrollView>

        {/**
         * Bottom Register Navigator
         */}
        <View style={{ paddingHorizontal: 30, paddingBottom: 10 }}>
          {/* or */}
          <View
            style={{
              position: 'relative',
              marginTop: 10,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: 18
            }}
          >
            <View
              style={{
                backgroundColor: Colors.trueGray[200],
                width: '100%',
                height: 1
              }}
            />
            <Text
              style={{
                position: 'absolute',
                fontSize: 12,
                fontFamily: 'Montserrat-SemiBold',
                backgroundColor: Colors.white,
                paddingHorizontal: 10
              }}
            >
              or
            </Text>
          </View>
          {/* Register */}
          <TouchableOpacity
            style={{
              backgroundColor: Colors.yellow[100],
              paddingVertical: 10,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 7,
              alignSelf: 'center',
              marginTop: 10
            }}
            onPress={() => navigation.navigate('Register')}
          >
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                textTransform: 'uppercase'
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>

        {/* Alert box */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 30,
            left: 30,
            backgroundColor: Colors.yellow[200],
            padding: 20,
            borderRadius: 7,
            minHeight: 80,
            transform: [
              {
                translateY: showAlert.alert ? 0 : 100
              }
            ]
          }}
        >
          <Text
            style={{ textAlign: 'center', fontFamily: 'Montserrat-Regular' }}
          >
            {showAlert.message}
          </Text>
        </View>
        {/* Keyboard */}
        <View
          style={{
            height: keyboardHeight <= 0 ? keyboardHeight : keyboardHeight + 50
          }}
        />
      </View>
    </ScrollView>
  )
}

export default Login
