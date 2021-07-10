import { Animated, Easing } from 'react-native'
import {
  TransitionSpecs,
  HeaderStyleInterpolators
} from '@react-navigation/stack'

export const HorizontalAnimation = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0]
            })
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9]
                })
              : 1
          }
        ],
        transitionSpec: {
          duration: 1000,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing,
          useNativeDriver: true
        }
      }
    }
  }
}

export const VerticalSlideAnimation = {
  gestureDirection: 'vertical',
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0]
            })
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9]
                })
              : 1
          }
        ],
        transitionSpec: {
          duration: 1000,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing,
          useNativeDriver: true
        }
      }
    }
  }
}

export const SlideXAnimations = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0]
            })
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0]
            })
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9]
                })
              : 1
          },
          { perspective: 1000 }
        ],
        transitionSpec: {
          duration: 1000,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing,
          useNativeDriver: true
        }
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5]
        })
      }
    }
  }
}

export const toAnime = ({ ref, toValue, duration, useNativeDriver }) => {
  // Will change translateY value to 0 in 0.5 seconds
  Animated.timing(ref, {
    toValue: toValue ?? 0,
    duration: duration ?? 500,
    useNativeDriver: useNativeDriver ?? true
  }).start()
}
