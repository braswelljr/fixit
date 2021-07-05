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
  Platform,
  KeyboardAvoidingView,
  Alert
} from 'react-native'
import Colors from '../assets/color'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Tabs from '../components/Tabs'
import { usekeyboardHeight } from '../hooks/usekeyboard'
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayout'
import { AuthContext } from '../context/AuthProvider'

const Register = ({ navigation }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current
  const ScrollViewref = React.useRef()
  const scrollContainerRef = React.useRef()
  const keyboardShowRef = React.useRef()
  const [keyboardShowView, setKeyboardShowView] = React.useState(0)
  const { register } = React.useContext(AuthContext)

  // driver
  const [userData, setUserData] = React.useState({
    email: '', ///^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    password: '',
    confirmPassword: '',
    isValidEmail: true,
    isValidPassword: true,
    showPassword: true,
    showConfirmPassword: true,
    passwordConfirmed: true
  })

  const changeUserEmailInput = e => {
    if (e.length > 0) {
      setUserData({
        ...userData,
        email: e,
        isValidEmail: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          e.trim()
        )
          ? true
          : false
      })
    } else {
      setUserData({
        ...userData,
        email: e,
        isValidEmail: false
      })
    }
  }

  const changeUserPasswordInput = e => {
    if (e.trim().length > 0) {
      setUserData({
        ...userData,
        password: e,
        isValidPassword: e.trim().length >= 8 ? true : false
      })
    } else {
      setUserData({
        ...userData,
        password: e,
        isValidPassword: false
      })
    }
  }

  const changeUserConfirmPasswordInput = e => {
    if (e.trim().length > 0) {
      setUserData({
        ...userData,
        confirmPassword: e.trim(),
        passwordConfirmed: userData.password === e.trim() ? true : false
      })
    } else {
      setUserData({
        ...userData,
        confirmPassword: e,
        isValidPassword: false
      })
    }
  }

  const toggleShowPasswordUser = e => {
    setUserData({
      ...userData,
      showPassword: !e
    })
  }
  const toggleShowConfirmPasswordUser = e => {
    setUserData({
      ...userData,
      showConfirmPassword: !e
    })
  }

  // mechanic
  const [mechanicData, setMechanicData] = React.useState({
    email: '', ///^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    password: '',
    confirmPassword: '',
    isValidEmail: true,
    isValidPassword: true,
    showPassword: true,
    showConfirmPassword: true,
    passwordConfirmed: true
  })

  const changeMechEmailInput = e => {
    if (e.length > 0) {
      setMechanicData({
        ...mechanicData,
        email: e,
        isValidEmail: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e)
          ? true
          : false
      })
    } else {
      setMechanicData({
        ...mechanicData,
        email: e,
        isValidEmail: false
      })
    }
  }

  const changeMechPasswordInput = e => {
    if (e.length > 0) {
      setMechanicData({
        ...mechanicData,
        password: e,
        isValidPassword: e.trim().length >= 8 ? true : false
      })
    } else {
      setMechanicData({
        ...mechanicData,
        password: e,
        isValidPassword: false
      })
    }
  }

  const changeMechConfirmPasswordInput = e => {
    if (e.length > 0) {
      setMechanicData({
        ...mechanicData,
        confirmPassword: e.trim(),
        passwordConfirmed: mechanicData.password === e.trim() ? true : false
      })
    } else {
      setMechanicData({
        ...mechanicData,
        confirmPassword: e,
        isValidPassword: false
      })
    }
  }

  const toggleShowPasswordMech = e => {
    setMechanicData({
      ...mechanicData,
      showPassword: !e
    })
  }
  const toggleShowConfirmPasswordMech = e => {
    setMechanicData({
      ...mechanicData,
      showConfirmPassword: !e
    })
  }

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

  useIsomorphicLayoutEffect(() => {
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

    return () => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow)
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide)
    }
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
          source={require('../assets/images/driver-ii.png')}
          style={{
            height: Dimensions.get('screen').height * 0.3,
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
              Register
            </Text>
          </View>
        </ImageBackground>
      </View>

      {/* Form Area */}

      <KeyboardAvoidingView
        behavior="height"
        ref={keyboardShowRef}
        onLayout={event => {
          setKeyboardShowView(event.nativeEvent.layout.y)
          console.log(keyboardShowView)
        }}
        style={{ flex: 1 }}
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
                marginTop: 15
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
                  Register with Google
                </Text>
              </TouchableOpacity>

              {/* or */}
              <View
                style={{
                  position: 'relative',
                  marginTop: 15,
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
              <View style={{ marginTop: 15 }}>
                {/*
                 * email field
                 */}
                <View style={{ position: 'relative' }}>
                  <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
                    Email
                  </Text>
                  <TextInput
                    value={userData.email}
                    placeholder="johndoe@gmail.com"
                    placeholderTextColor={Colors.trueGray[400]}
                    autoCapitalize="none"
                    onChangeText={e => changeUserEmailInput(e)}
                    style={{
                      borderWidth: 0.5,
                      padding: 7,
                      color: Colors.black,
                      borderRadius: 7,
                      marginVertical: 2.5,
                      fontFamily: 'Montserrat-SemiBold'
                    }}
                  />
                  {userData.isValidEmail ? null : (
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Regular',
                        color: Colors.red[400]
                      }}
                    >
                      Enter a valid email
                    </Text>
                  )}
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
                      onPress={() =>
                        toggleShowPasswordUser(userData.showPassword)
                      }
                    >
                      <MaterialIcon
                        name={userData.showPassword ? 'eye' : 'eye-off'}
                        size={25}
                      />
                    </TouchableOpacity>
                    <TextInput
                      value={userData.password}
                      placeholder={
                        userData.showPassword ? '********' : 'xc5667%%'
                      }
                      placeholderTextColor={Colors.trueGray[400]}
                      autoCapitalize="none"
                      secureTextEntry={userData.showPassword}
                      onChangeText={e => changeUserPasswordInput(e)}
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
                  {userData.isValidPassword ? null : (
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Regular',
                        color: Colors.red[400]
                      }}
                    >
                      Password length must be 8 or more
                    </Text>
                  )}
                </View>
                {/*
                 *Confirm Password Field
                 */}
                <View style={{ marginTop: 15 }}>
                  <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
                    Confirm Password
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
                      onPress={() => {
                        toggleShowConfirmPasswordUser(
                          userData.showConfirmPassword
                        )
                      }}
                    >
                      <MaterialIcon
                        name={userData.showConfirmPassword ? 'eye' : 'eye-off'}
                        size={25}
                      />
                    </TouchableOpacity>
                    <TextInput
                      value={userData.confirmPassword}
                      placeholder={
                        userData.showConfirmPassword ? '********' : 'xc5667%%'
                      }
                      placeholderTextColor={Colors.trueGray[400]}
                      autoCapitalize="none"
                      secureTextEntry={userData.showConfirmPassword}
                      onChangeText={e => changeUserConfirmPasswordInput(e)}
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
                  {userData.passwordConfirmed ? null : (
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Regular',
                        color: Colors.red[400]
                      }}
                    >
                      Passwords don't match
                    </Text>
                  )}
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
                  onPress={() => {
                    if (
                      userData.email == '' &&
                      userData.password === '' &&
                      userData.confirmPassword === ''
                    ) {
                      Alert.alert('Empty Fields', [{ text: 'OK' }])
                    } else {
                      if (
                        userData.isValidEmail == true &&
                        userData.isValidPassword == true &&
                        userData.passwordConfirmed == true &&
                        userData.email !== '' &&
                        userData.password !== ''
                      ) {
                        register('users', userData.email, userData.password)
                      } else {
                        Alert.alert('Authentication Error!', [{ text: 'OK' }])
                      }
                    }
                  }}
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
                marginTop: 15
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
                  Register with Google
                </Text>
              </TouchableOpacity>

              {/* or */}
              <View
                style={{
                  position: 'relative',
                  marginTop: 15,
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
              <View style={{ marginTop: 15 }}>
                {/*
                 * Mechanic or email field
                 */}
                <View style={{}}>
                  <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
                    Email
                  </Text>
                  <TextInput
                    value={mechanicData.email}
                    placeholder="janedoe@gmail.com"
                    placeholderTextColor={Colors.trueGray[400]}
                    autoCapitalize="none"
                    onChangeText={e => changeMechEmailInput(e)}
                    style={{
                      borderWidth: 0.5,
                      padding: 7,
                      color: Colors.black,
                      borderRadius: 7,
                      marginVertical: 2.5,
                      fontFamily: 'Montserrat-SemiBold'
                    }}
                  />
                  {mechanicData.isValidEmail ? null : (
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Regular',
                        color: Colors.red[400]
                      }}
                    >
                      Enter a valid email
                    </Text>
                  )}
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
                      onPress={() =>
                        toggleShowPasswordMech(mechanicData.showPassword)
                      }
                    >
                      <MaterialIcon
                        name={mechanicData.showPassword ? 'eye' : 'eye-off'}
                        size={25}
                      />
                    </TouchableOpacity>
                    <TextInput
                      value={mechanicData.password}
                      placeholder={
                        mechanicData.showPassword ? '********' : '&%gr4xcw'
                      }
                      placeholderTextColor={Colors.trueGray[400]}
                      autoCapitalize="none"
                      secureTextEntry={mechanicData.showPassword}
                      onChangeText={e => changeMechPasswordInput(e)}
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
                  {mechanicData.isValidPassword ? null : (
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Regular',
                        color: Colors.red[400]
                      }}
                    >
                      Password length should be 8 or more.
                    </Text>
                  )}
                </View>
                {/*
                 *Confirm Password Field
                 */}
                <View style={{ marginTop: 15 }}>
                  <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
                    Confirm Password
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
                      onPress={() =>
                        toggleShowConfirmPasswordMech(
                          mechanicData.showConfirmPassword
                        )
                      }
                    >
                      <MaterialIcon
                        name={
                          mechanicData.showConfirmPassword ? 'eye' : 'eye-off'
                        }
                        size={25}
                      />
                    </TouchableOpacity>
                    <TextInput
                      value={mechanicData.confirmPassword}
                      placeholder={
                        mechanicData.showConfirmPassword
                          ? '********'
                          : '&%gr4xcw'
                      }
                      placeholderTextColor={Colors.trueGray[400]}
                      autoCapitalize="none"
                      secureTextEntry={mechanicData.showConfirmPassword}
                      onChangeText={e => changeMechConfirmPasswordInput(e)}
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
                  {mechanicData.passwordConfirmed ? null : (
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Regular',
                        color: Colors.red[400]
                      }}
                    >
                      Passwords don't match
                    </Text>
                  )}
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
                  onPress={() => {
                    if (
                      mechanicData.email == '' &&
                      mechanicData.password === '' &&
                      mechanicData.confirmPassword === ''
                    ) {
                      Alert.alert('Empty Fields', [{ text: 'OK' }])
                    } else {
                      if (
                        mechanicData.isValidEmail == true &&
                        mechanicData.isValidPassword == true &&
                        mechanicData.passwordConfirmed == true &&
                        mechanicData.email !== '' &&
                        mechanicData.password !== ''
                      ) {
                        register('mechanic', userData.email, userData.password)
                      } else {
                        Alert.alert('Authentication Error!', [{ text: 'OK' }])
                      }
                    }
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      textTransform: 'uppercase',
                      paddingLeft: 20
                    }}
                  >
                    Register
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
              marginTop: 15,
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
          {/* Login */}
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
            onPress={() => navigation.navigate('Login')}
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

        {/* Keyboard */}
        <View
          style={{
            height: keyboardHeight <= 0 ? keyboardHeight : keyboardHeight + 50
          }}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default Register
