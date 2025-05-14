//https://github.com/farhoudshapouran/react-native-ui-datepicker
import { theme } from '@/theme'
import { useState } from 'react'
import {
   StyleProp,
   Text,
   TouchableOpacity,
   View,
   ViewStyle
} from 'react-native'
import DateTimePicker, {
   CalendarComponents,
   DateType,
   useDefaultStyles
} from 'react-native-ui-datepicker'
import { MaterialIcons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import calendarComponents from './CalendarComponents'

const DateRangeSelect = ({
   style,
   onClose
}: {
   style: StyleProp<ViewStyle>
   onClose: (startDate: DateType, endDate: DateType) => void
}) => {
   const defaultStyles = useDefaultStyles()
   const [selectedStartDate, setSelectedStartDate] = useState<DateType>(
      new Date()
   )
   const [selectedEndDate, setSelectedEndDate] = useState<DateType>()
   const [visible, setVisible] = useState(false)
   const formatDate = (date: DateType) => {
      return dayjs(date).format('DD/MM/YYYY')
   }

   const handleSelectedDate = (startDate: DateType, endDate: DateType) => {
      setSelectedStartDate(startDate)
      setSelectedEndDate(endDate)
   }

   const handleButtonPress = () => {
      setVisible(!visible)
      if (visible) {
         onClose(selectedStartDate, selectedEndDate)
      }
   }

   return (
      <View style={style}>
         <TouchableOpacity
            onPress={() => handleButtonPress()}
            style={{
               flexDirection: 'row',
               alignItems: 'center',
               padding: 8,
               backgroundColor: theme.colors.primary,
               borderRadius: 8
            }}
         >
            {selectedStartDate ? (
               <View
                  style={{
                     flexDirection: 'row',
                     justifyContent: 'center',
                     flex: 1,
                     gap: 20
                  }}
               >
                  <Text
                     style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: theme.colors.white
                     }}
                  >
                     {formatDate(selectedStartDate)}
                  </Text>
                  {formatDate(selectedEndDate) ? (
                     <Text
                        style={{
                           fontWeight: 'bold',
                           fontSize: 16,
                           color: theme.colors.white
                        }}
                     >
                        {' '}
                        -{' '}
                     </Text>
                  ) : null}
                  <Text
                     style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: theme.colors.white
                     }}
                  >
                     {formatDate(selectedEndDate)}
                  </Text>
               </View>
            ) : (
               <Text
                  style={{
                     fontWeight: 'bold',
                     fontSize: 16,
                     color: theme.colors.white,
                     textAlign: 'center',
                     flex: 1
                  }}
               >
                  {dayjs(new Date()).format('DD/MM/YYYY')}
               </Text>
            )}
         </TouchableOpacity>
         {visible ? (
            <View
               style={{
                  position: 'absolute',
                  zIndex: 999,
                  top: 35,
                  backgroundColor: theme.colors.whiteGray,
                  borderBottomRightRadius: 40,
                  borderBottomLeftRadius: 40
               }}
            >
               <DateTimePicker
                  date={'dayjs'}
                  calendar="gregory"
                  mode="range"
                  locale="pt"
                  startDate={selectedStartDate}
                  endDate={selectedEndDate}
                  onChange={({ startDate, endDate }) =>
                     handleSelectedDate(startDate, endDate)
                  }
                  components={calendarComponents}
                  navigationPosition="around"
                  styles={{
                     ...defaultStyles,
                     today: {
                        borderColor: theme.colors.primary,
                        borderWidth: 1
                     },
                     today_label: { fontWeight: 'bold' },
                     selected: { backgroundColor: theme.colors.primary },
                     selected_label: {
                        color: theme.colors.white,
                        fontWeight: 'bold'
                     },
                     selected_month: { backgroundColor: theme.colors.primary },
                     active_year: { backgroundColor: theme.colors.primary },
                     active_year_label: {
                        color: theme.colors.white,
                        fontWeight: 'bold'
                     },
                     range_middle: { backgroundColor: theme.colors.primary },
                     range_middle_label: {
                        color: theme.colors.white,
                        fontWeight: 'bold'
                     }
                  }}
               />
            </View>
         ) : null}
      </View>
   )
}

export default DateRangeSelect
