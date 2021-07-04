import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

export const usekeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  const onKeyboardDidShow = e => {
    setKeyboardHeight(e.endCoordinates.height)
  }

  const onKeyboardDidHide = () => {
    setKeyboardHeight(0)
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow)
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide)
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow', onKeyboardDidShow)
      Keyboard.removeAllListeners('keyboardDidHide', onKeyboardDidHide)
    }
  }, [])

  return keyboardHeight
}
