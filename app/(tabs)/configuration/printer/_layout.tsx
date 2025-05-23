import { Stack } from 'expo-router'
import { theme } from '@/theme'
const TabLayout = () => {
   return (
      <Stack
         screenOptions={{
            headerStyle: {
               backgroundColor: theme.colors.primary
            },
            headerTintColor: theme.colors.white
         }}
      >
         <Stack.Screen
            name="index"
            options={{
               title: 'Impressoras'
            }}
         />
      </Stack>
   )
}

export default TabLayout
