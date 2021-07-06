import React from 'react'
import { View } from 'react-native'
import Indicator from './Indicator'
import Tab from './Tab'

const Tabs = ({ data, scrollX, onItemPress }) => {
  const containerRef = React.useRef()
  const [measures, setMeasures] = React.useState([])

  React.useEffect(() => {
    let m = []
    data.forEach(item => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({ x, y, width, height })

          if (m.length === data.length) {
            setMeasures(m)
          }
        }
      )
    })
  }, [])

  return (
    <View>
      <View
        ref={containerRef}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }}
      >
        {data.map((item, i) => {
          return (
            <Tab
              key={i}
              item={item}
              onItemPress={() => onItemPress(i)}
              ref={item.ref}
              dataLength={data.length}
            />
          )
        })}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} data={data} scrollX={scrollX} />
      )}
    </View>
  )
}

export default Tabs
{
  /* <Tabs data={data} scrollX={scrollX} onItemPress={onItemPress} /> */
}
// const data = [
//   {
//     title: 'Driver',
//     ref: React.createRef()
//   },
//   {
//     title: 'Mechanic',
//     ref: React.createRef()
//   }
// ]
// const onItemPress = React.useCallback(itemIndex => {
//   ScrollViewref?.current?.scrollTo({
//     x: itemIndex * Dimensions.get('screen').width,
//     y: 0,
//     animated: true
//   })
// }, [])
