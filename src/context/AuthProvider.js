import React, { createContext, useState, useEffect } from 'react'
import { ToastAndroid } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import {
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [USER, setUSER] = useState({})

  // Google signin verification
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      webClientId:
        '680062429468-h8alvl3bu07llh2cb88mbbpamv3f1hv9.apps.googleusercontent.com',
      offlineAccess: true
    })
  }, [])

  React.useEffect(() => {
    if (user !== null) {
      try {
        firestore()
          .collection('users')
          .doc(user.uid)
          .get({ source: 'default' })
          .then(doc => {
            setUSER({ uid: user.uid, metadata: user.metadata, ...doc._data })
          })
          .catch(error => {
            console.log(error)
            ToastAndroid.show('Error occured while fetching user data')
          })
      } catch (error) {
        console.log('Something happened', error)
        ToastAndroid.show('Something Happened')
      }
    }
  }, [USER, user])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        USER,
        setUSER,
        login: async (email, password) => {
          try {
            await auth()
              .signInWithEmailAndPassword(email, password)
              .then(() => {})
              .catch(error => {
                if (error.code == 'auth/invalid-email')
                  ToastAndroid.show('Ivalid Email!', ToastAndroid.SHORT)
                else if (error.code == 'auth/user-disabled')
                  ToastAndroid.show('User disabled!', ToastAndroid.SHORT)
                else if (error.code == 'auth/user-not-found')
                  ToastAndroid.show("Email doesn't exist", ToastAndroid.SHORT)
                else if (error.code == 'auth/wrong-password')
                  ToastAndroid.show('Wrong password!', ToastAndroid.SHORT)
                else
                  ToastAndroid.show(
                    'Something happened could not sign you in!',
                    ToastAndroid.SHORT
                  )
              })
          } catch (e) {
            console.log(e)
          }
        },
        googleLogin: async () => {
          try {
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn()

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken)

            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential)
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
              console.log('Cancel')
            } else if (error.code === statusCodes.IN_PROGRESS) {
              console.log('Signin in progress')
              // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              console.log('PLAY_SERVICES_NOT_AVAILABLE')
              // play services not available or outdated
            } else {
              // some other error happened
              console.log('Something Happened', error)
            }
          }
        },
        register: async (email, password) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                //Once the user creation has happened successfully, we can add the currentUser into firestore
                //with the appropriate details.
                firestore()
                  .collection('users')
                  .doc(auth().currentUser.uid)
                  .set({
                    firstname: null,
                    lastname: null,
                    roles: ['driver'],
                    email: email,
                    phone: null,
                    avatar: null,
                    createdAt: firestore.Timestamp.fromDate(new Date())
                  })
                  //ensure we catch any errors at this stage to advise us if something does go wrong
                  .catch(error => {
                    console.log(
                      'Something went wrong with added user to firestore: ',
                      error
                    )
                    ToastAndroid.show(
                      'Something went wrong with added user to firestore !',
                      ToastAndroid.SHORT
                    )
                  })
              })
              //we need to catch the whole sign up process if it fails too.
              .catch(error => {
                console.log('Something went wrong with sign up: ', error)

                if (error.code == 'auth/invalid-email')
                  ToastAndroid.show('Ivalid Email!', ToastAndroid.SHORT)
                else if (error.code == 'auth/email-already-in-use')
                  ToastAndroid.show(
                    'Email already in use !',
                    ToastAndroid.SHORT
                  )
                else if (error.code == 'auth/operation-not-allowed')
                  ToastAndroid.show(
                    'Operation not allowed!',
                    ToastAndroid.SHORT
                  )
                else
                  ToastAndroid.show(
                    'Something happened could not sign you up!',
                    ToastAndroid.SHORT
                  )
              })
          } catch (e) {
            console.log(e)
            ToastAndroid.show(
              'Something happened could not sign you up!',
              ToastAndroid.SHORT
            )
          }
        },
        logout: async () => {
          try {
            await auth().signOut()
          } catch (e) {
            console.log('Something went wrong with logout: ', e)
            ToastAndroid.show(
              'Something happened could not log you out!',
              ToastAndroid.SHORT
            )
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
