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
  Alert,
  Platform,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native'
import Colors from '../assets/color'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { usekeyboardHeight } from '../hooks/usekeyboard'
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayout'
import { AuthContext } from '../context/AuthProvider'

const Login = ({ navigation }) => {
  const scrollContainerRef = React.useRef()
  const keyboardShowRef = React.useRef()
  const [keyboardShowView, setKeyboardShowView] = React.useState(0)
  const { login, googleLogin } = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState(false)

  // driver
  const [data, setData] = React.useState({
    email: '', ///^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    password: '',
    isValidEmail: true,
    isValidPassword: true,
    showPassword: true
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
        isValidPassword: e.trim().length >= 0 ? true : false
      })
    } else {
      setData({
        ...data,
        password: e,
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

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 6000)
  }, [loading])

  return (
    <ScrollView ref={scrollContainerRef} style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
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
            height: Dimensions.get('screen').height * 0.45,
            position: 'relative'
          }}
        >
          <View style={styles.imgCover}>
            <Text style={styles.headerText}>Login</Text>
          </View>
        </ImageBackground>
      </View>

      {/* Form Area */}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
              marginTop: 20
            }}
          >
            {/* Google Button */}
            <TouchableOpacity style={styles.cta} onPress={() => googleLogin()}>
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
                Login with Google
              </Text>
            </TouchableOpacity>

            {/* or */}
            <View style={styles.orWrapper}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>or</Text>
            </View>

            <View style={{ marginTop: 20 }}>
              {/*
               * Username or email field
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
                  keyboardType="email-address"
                />
                {data.isValidEmail ? null : (
                  <Text style={styles.isValid}>Enter a valid email</Text>
                )}
              </View>
              {/*
               *Password Field
               */}
              <View style={{ marginTop: 20 }}>
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
                    placeholder={data.showPassword ? '********' : '&%gr4xcw'}
                    placeholderTextColor={Colors.trueGray[400]}
                    autoCapitalize="none"
                    secureTextEntry={data.showPassword}
                    onChangeText={e => changePasswordInput(e)}
                    style={styles.passInput}
                  />
                </View>
                {data.isValidPassword ? null : (
                  <Text style={styles.isValid}>
                    Password field must not be empty
                  </Text>
                )}
              </View>
              {/*
               *Submit Button
               */}
              <TouchableOpacity
                style={[styles.cta, { marginTop: 15 }]}
                onPress={() => {
                  if (data.email == '' && data.password === '') {
                    Alert.alert('', 'Empty Fields', [{ text: 'OK' }])
                  } else {
                    if (
                      data.isValidEmail == true &&
                      data.isValidPassword == true &&
                      data.email !== '' &&
                      data.password !== ''
                    ) {
                      login(data.email, data.password)
                      setLoading(true)
                    } else {
                      Alert.alert('', 'Authentication Error!', [{ text: 'OK' }])
                    }
                  }
                }}
              >
                {loading ? (
                  <ActivityIndicator size="small" color={Colors.sky[900]} />
                ) : (
                  <Text style={styles.ctaText}>Login</Text>
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
          <View style={styles.orWrapper}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>or</Text>
          </View>
          {/* Register */}
          <TouchableOpacity
            style={[
              styles.cta,
              {
                marginTop: 10
              }
            ]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.ctaText}>Register</Text>
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
  back: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? 50 : 25,
    left: 15,
    zIndex: 2
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
    fontSize: 14,
    borderWidth: 1,
    padding: 7,
    color: Colors.black,
    borderRadius: 7,
    marginVertical: 2.5
  },
  isValid: {
    fontFamily: 'Montserrat-Regular',
    color: Colors.red[400]
  },
  passInputContainer: {
    marginVertical: 2.5,
    position: 'relative',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
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
  }
})

export default Login
