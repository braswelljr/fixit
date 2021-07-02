import React from 'react'
import { Dimensions, Animated } from 'react-native'
import Colors from '../assets/color'

const Indicator = ({ data, measures, scrollX }) => {
  const inputRange = data.map((_, i) => i * Dimensions.get('screen').width)
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map(measure => measure.width)
  })
  const indicatorHeight = scrollX.interpolate({
    inputRange,
    outputRange: measures.map(measure => measure.height)
  })
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map(measure => measure.x)
  })

  return (
    <Animated.View
      style={{
        backgroundColor: Colors.gray[500],
        height: indicatorHeight,
        borderRadius: 10,
        position: 'absolute',
        width: indicatorWidth,
        bottom: 0,
        opacity: 0.5,
        left: 0,
        transform: [
          {
            translateX: translateX
          }
        ]
      }}
    />
  )
}

export default Indicator
