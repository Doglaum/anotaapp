import { CalendarComponents } from 'react-native-ui-datepicker'
import { MaterialIcons } from '@expo/vector-icons'
import { theme } from '@/theme'

const calendarComponents: CalendarComponents = {
   IconNext: (
      <MaterialIcons
         size={35}
         name={'navigate-next'}
         color={theme.colors.primary}
      />
   ),
   IconPrev: (
      <MaterialIcons
         size={35}
         name={'navigate-before'}
         color={theme.colors.primary}
      />
   )
}

export default calendarComponents
