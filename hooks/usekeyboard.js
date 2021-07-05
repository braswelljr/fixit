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
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow)
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide)
    }
  }, [])

  return keyboardHeight
}
