//https://github.com/farhoudshapouran/react-native-ui-datepicker
import { theme } from '@/theme'
import { useState } from 'react'
import {
   Button,
   StyleProp,
   Text,
   TouchableOpacity,
   TouchableWithoutFeedback,
   View,
   ViewStyle
} from 'react-native'
import DateTimePicker, {
   DateType,
   useDefaultStyles
} from 'react-native-ui-datepicker'
import dayjs from 'dayjs'

const DatePicker = ({ style }: { style: StyleProp<ViewStyle> }) => {
   const defaultStyles = useDefaultStyles()
   const [selectedStartDate, setSelectedStartDate] = useState<DateType>()
   const [selectedEndDate, setSelectedEndDate] = useState<DateType>()
   const [visible, setVisible] = useState(false)
   const formatDate = (date: DateType) => {
      return date?.toLocaleString('pt-BR').replace(/,.*/, '') || ''
   }

   return (
      <View style={style}>
         <TouchableOpacity
            onPress={() => setVisible(!visible)}
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
                  {formatDate(selectedEndDate) && (
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
                  )}
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
                  Selecione uma data
               </Text>
            )}
         </TouchableOpacity>
         {visible && (
            <View
               style={{
                  position: 'absolute',
                  zIndex: 999,
                  top: 35,
                  backgroundColor: theme.colors.appContainerColor,
                  borderWidth: 0.2,
                  borderBottomRightRadius: 40,
                  borderBottomLeftRadius: 40
               }}
            >
               <DateTimePicker
                  date={'dayjs'}
                  calendar="gregory"
                  mode="range"
                  locale="pt_BR"
                  startDate={selectedStartDate}
                  endDate={selectedEndDate}
                  onChange={({ startDate, endDate }) => {
                     setSelectedStartDate(startDate)
                     setSelectedEndDate(endDate)
                  }}
                  styles={{
                     ...defaultStyles,
                     today: {
                        borderColor: theme.colors.primary,
                        borderWidth: 1
                     }, // Add a border to today's date
                     today_label: { fontWeight: 'bold' },
                     selected: { backgroundColor: theme.colors.primary }, // Highlight the selected day
                     selected_label: {
                        color: theme.colors.white,
                        fontWeight: 'bold'
                     }, // Highlight the selected day label
                     selected_month: { backgroundColor: theme.colors.primary },
                     active_year: { backgroundColor: theme.colors.primary },
                     active_year_label: {
                        color: theme.colors.white,
                        fontWeight: 'bold'
                     }, // Highlight the selected day label,
                     range_middle: { backgroundColor: theme.colors.primary },
                     range_middle_label: {
                        color: theme.colors.white,
                        fontWeight: 'bold'
                     }
                  }}
               />
            </View>
         )}
         )
      </View>
   )
}

export default DatePicker
