import React from 'react'
import {
  ActivityIndicator,
  Text,
  ImageBackground,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
  Keyboard,
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
  StyleSheet
} from 'react-native'
import Colors from '../assets/color'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { usekeyboardHeight } from '../hooks/usekeyboard'
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayout'
import { AuthContext } from '../context/AuthProvider'

const Register = ({ navigation }) => {
  const scrollContainerRef = React.useRef()
  const keyboardShowRef = React.useRef()
  const [keyboardShowView, setKeyboardShowView] = React.useState(0)
  const { register } = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState(false)

  // driver
  const [data, setData] = React.useState({
    email: '', ///^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    password: '',
    confirmPassword: '',
    isValidEmail: true,
    isValidPassword: true,
    showPassword: true,
    showConfirmPassword: true,
    passwordConfirmed: true
  })

  const changeEmailInput = e => {
    if (e.length > 0) {
      setData({
        ...data,
        email: e,
        isValidEmail: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          e.trim()
        )
          ? true
          : false
      })
    } else {
      setData({
        ...data,
        email: e,
        isValidEmail: false
      })
    }
  }

  const changePasswordInput = e => {
    if (e.trim().length > 0) {
      setData({
        ...data,
        password: e,
        isValidPassword: e.trim().length >= 8 ? true : false
      })
    } else {
      setData({
        ...data,
        password: e,
        isValidPassword: false
      })
    }
  }

  const changeConfirmPasswordInput = e => {
    if (e.trim().length > 0) {
      setData({
        ...data,
        confirmPassword: e.trim(),
        passwordConfirmed: data.password === e.trim() ? true : false
      })
    } else {
      setData({
        ...data,
        confirmPassword: e,
        isValidPassword: false
      })
    }
  }

  const toggleShowPassword = e => {
    setData({
      ...data,
      showPassword: !e
    })
  }
  const toggleShowConfirmPassword = e => {
    setData({
      ...data,
      showConfirmPassword: !e
    })
  }

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

    // return () => {
    //   Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow)
    //   Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide)
    // }
  }, [keyboardShowView])

  React.useEffect(() => {
    const setLoader = setTimeout(() => {
      setLoading(false)
    }, 10000)

    return () => {
      clearTimeout(setLoader)
    }
  }, [loading])

  return (
    <ScrollView ref={scrollContainerRef} style={styles.container}>
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
      <ImageBackground
        source={require('../assets/images/driver-ii.png')}
        style={{
          height: Dimensions.get('screen').height * 0.35,
          position: 'relative'
        }}
      >
        <View style={styles.imgCover}>
          <Text style={styles.headerText}>Register</Text>
        </View>
      </ImageBackground>

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
            <TouchableOpacity style={[styles.cta]}>
              <Image
                source={require('../assets/images/google.png')}
                style={{ height: 15, width: 15 }}
              />
              <Text
                style={[
                  styles.ctaText,
                  {
                    paddingLeft: 20
                  }
                ]}
              >
                Register with Google
              </Text>
            </TouchableOpacity>

            {/* or */}
            <View style={styles.orWrapper}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>or</Text>
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
                <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>Email</Text>
                <TextInput
                  value={data.email}
                  placeholder="johndoe@gmail.com"
                  placeholderTextColor={Colors.trueGray[400]}
                  autoCapitalize="none"
                  onChangeText={e => changeEmailInput(e)}
                  style={styles.textInput}
                />
                {data.isValidEmail ? null : (
                  <Text style={styles.isValid}>Enter a valid email</Text>
                )}
              </View>
              {/*
               *Password Field
               */}
              <View style={{ marginTop: 15 }}>
                <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
                  Password
                </Text>
                <View style={styles.passInputContainer}>
                  <TouchableOpacity
                    style={styles.showPassword}
                    onPress={() => toggleShowPassword(data.showPassword)}
                  >
                    <MaterialIcon
                      name={data.showPassword ? 'eye' : 'eye-off'}
                      size={25}
                    />
                  </TouchableOpacity>
                  <TextInput
                    value={data.password}
                    placeholder={data.showPassword ? '********' : 'xc5667%%'}
                    placeholderTextColor={Colors.trueGray[400]}
                    autoCapitalize="none"
                    secureTextEntry={data.showPassword}
                    onChangeText={e => changePasswordInput(e)}
                    style={styles.passInput}
                  />
                </View>
                {data.isValidPassword ? null : (
                  <Text style={styles.isValid}>
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
                <View style={styles.passInputContainer}>
                  <TouchableOpacity
                    style={styles.showPassword}
                    onPress={() => {
                      toggleShowConfirmPassword(data.showConfirmPassword)
                    }}
                  >
                    <MaterialIcon
                      name={data.showConfirmPassword ? 'eye' : 'eye-off'}
                      size={25}
                    />
                  </TouchableOpacity>
                  <TextInput
                    value={data.confirmPassword}
                    placeholder={
                      data.showConfirmPassword ? '********' : 'xc5667%%'
                    }
                    placeholderTextColor={Colors.trueGray[400]}
                    autoCapitalize="none"
                    secureTextEntry={data.showConfirmPassword}
                    onChangeText={e => changeConfirmPasswordInput(e)}
                    style={styles.passInput}
                  />
                </View>
                {data.passwordConfirmed ? null : (
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
                style={[styles.cta, { marginTop: 15 }]}
                onPress={() => {
                  if (
                    data.email == '' &&
                    data.password === '' &&
                    data.confirmPassword === ''
                  ) {
                    Alert.alert('Empty Fields', [{ text: 'OK' }])
                  } else {
                    if (
                      data.isValidEmail == true &&
                      data.isValidPassword == true &&
                      data.passwordConfirmed == true &&
                      data.email !== '' &&
                      data.password !== ''
                    ) {
                      register(data.email, data.password)
                      setLoading(true)
                    } else {
                      Alert.alert('Authentication Error!', [{ text: 'OK' }])
                    }
                  }
                }}
              >
                {loading ? (
                  <ActivityIndicator size="small" color={Colors.sky[900]} />
                ) : (
                  <Text style={styles.ctaText}>Register</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/**
         * Bottom Register Navigator
         */}
        <View style={{ paddingHorizontal: 30, paddingBottom: 10 }}>
          {/* or */}
          <View style={[styles.orWrapper]}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>or</Text>
          </View>
          {/* Login */}
          <TouchableOpacity
            style={[
              styles.cta,
              {
                marginTop: 15
              }
            ]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.ctaText}>Login</Text>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    minHeight: Dimensions.get('screen').height
  },
  headerText: {
    color: Colors.white,
    fontFamily: 'MontserratAlternates-Bold',
    fontSize: 35,
    textTransform: 'uppercase'
  },
  imgCover: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cta: {
    backgroundColor: Colors.yellow[100],
    paddingVertical: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    alignSelf: 'center'
  },
  ctaText: {
    fontFamily: 'Montserrat-SemiBold',
    textTransform: 'uppercase'
  },
  orWrapper: {
    position: 'relative',
    marginTop: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 18
  },
  orLine: {
    backgroundColor: Colors.trueGray[200],
    width: '100%',
    height: 1
  },
  orText: {
    position: 'absolute',
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    backgroundColor: Colors.white,
    paddingHorizontal: 10
  },
  textInput: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'normal',
    fontSize: 14,
    borderWidth: 0.5,
    padding: 7,
    color: Colors.black,
    borderRadius: 7,
    marginVertical: 2.5
  },
  passInputContainer: {
    marginVertical: 2.5,
    position: 'relative',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 0.5,
    borderRadius: 7
  },
  showPassword: {
    position: 'absolute',
    zIndex: 1,
    right: 5,
    padding: 4
  },
  passInput: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'normal',
    fontSize: 14,
    padding: 7,
    color: Colors.black,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  isValid: {
    fontFamily: 'Montserrat-Regular',
    color: Colors.red[400]
  }
})

export default Register
