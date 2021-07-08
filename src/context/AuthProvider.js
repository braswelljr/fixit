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

  // Google signin verification
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      webClientId:
        '680062429468-h8alvl3bu07llh2cb88mbbpamv3f1hv9.apps.googleusercontent.com',
      offlineAccess: true
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth()
              .signInWithEmailAndPassword(email, password)
              .then(() => {})
              .catch(error => {
                switch (error.code) {
                  case 'auth/invalid-email':
                    ToastAndroid.show('Ivalid Email!', ToastAndroid.LONG)
                    break
                  case 'auth/user-disabled':
                    ToastAndroid.show('User disabled!', ToastAndroid.LONG)
                    break
                  case 'auth/user-not-found':
                    ToastAndroid.show("Email doesn't exist", ToastAndroid.LONG)
                    break
                  case 'auth/wrong-password':
                    ToastAndroid.show('Wrong password!', ToastAndroid.LONG)
                    break
                  default:
                    ToastAndroid.show(
                      'Something happened could not sign you in!',
                      ToastAndroid.LONG
                    )
                }
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
                    firstname: '',
                    lastname: '',
                    roles: ['driver'],
                    email: email,
                    phone: '',
                    avatar: null,
                    createdAt: firestore.Timestamp.fromDate(new Date())
                  })
                  //ensure we catch any errors at this stage to advise us if something does go wrong
                  .catch(error => {
                    console.log(
                      'Something went wrong with added user to firestore: ',
                      error
                    )
                  })
              })
              //we need to catch the whole sign up process if it fails too.
              .catch(error => {
                console.log('Something went wrong with sign up: ', error)
                switch (error.code) {
                  case 'auth/invalid-email':
                    ToastAndroid.show('Ivalid Email!', ToastAndroid.LONG)
                    break
                  case 'auth/email-already-in-use':
                    ToastAndroid.show(
                      'Email already in use !',
                      ToastAndroid.LONG
                    )
                    break
                  case 'auth/operation-not-allowed':
                    ToastAndroid.show(
                      'Operation not allowed!',
                      ToastAndroid.LONG
                    )
                    break
                  default:
                    ToastAndroid.show(
                      'Something happened could not sign you up!',
                      ToastAndroid.LONG
                    )
                    break
                }
              })
          } catch (e) {
            console.log(e)
          }
        },
        logout: async () => {
          try {
            await auth().signOut()
          } catch (e) {
            console.log('Something went wrong with logout: ', e)
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
