import React from 'react'
import { View } from 'react-native'
import Indicator from './Indicator'
import Tab from './Tab'

const Tabs = ({ data, style, scrollX, onItemPress }) => {
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
        <Indicator
          measures={measures}
          style={style}
          data={data}
          scrollX={scrollX}
        />
      )}
    </View>
  )
}

export default Tabs

{
  /* <Animatable.View */
}
//   style={styles.container}
//   animation="slideInRight"
//   contentInsetAdjustmentBehavior="automatic"
//   duration={500}
//   easing="ease"
//   useNativeDriver={true}
// >
//   <Animated.ScrollView
//     ref={ScrollViewref}
//     horizontal
//     showsHorizontalScrollIndicator={false}
//     pagingEnabled
//     onScroll={Animated.event(
//       [
//         {
//           nativeEvent: {
//             contentOffset: { x: scrollX }
//           }
//         }
//       ],
//       { useNativeDriver: false }
//     )}
//     bounces={false}
//   >
//     <Maps search={search} showSearch={showSearch} />
//     <Profile picker={picker} showPicker={showPicker} />
//     <Settings />
//   </Animated.ScrollView>
//   {/* Tabs */}
//   <View style={styles.slab}>
//     <Tabs data={data} scrollX={scrollX} onItemPress={onItemPress} />
//   </View>
// </Animatable.View>

// const onItemPress = useCallback(itemIndex => {
//   ScrollViewref?.current?.scrollTo({
//     x: itemIndex * Dimensions.get('screen').width,
//     y: 0,
//     animated: true
//   })
// }, [])

// const data = [
//   {
//     title: 'Home',
//     ref: createRef()
//   },
//   {
//     title: 'Profile',
//     ref: createRef()
//   },
//   {
//     title: 'Settings',
//     ref: createRef()
//   }
// ]
// const scrollX = useRef(new Animated.Value(0)).current
//   const ScrollViewref = useRef()
