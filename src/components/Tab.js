import React from 'react'
import { Text, View, TouchableOpacity, Dimensions } from 'react-native'

const Tab = React.forwardRef(({ item, onItemPress, dataLength }, ref) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View
        ref={ref}
        style={{
          paddingVertical: 10,
          width: (Dimensions.get('screen').width - 20) / dataLength
        }}
      >
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 15,
            alignSelf: 'center'
          }}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
})

export default Tab
