import { useState } from 'react'
import firestore from '@react-native-firebase/firestore'

export const hasAccount = (collection, email) =>
  firestore().collection(collection).where('email', '==', `${email}`).isEqual()

export const Login = (collection, details) => {
  const [data, setData] = useState({})
  firestore()
    .collection(collection)
    .where('email', '==', details.email)
    .get()
    .then(res => setData(res))
    .catch(error => error)
  return data
}
