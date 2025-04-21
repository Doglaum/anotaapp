import { Stack } from 'expo-router'
import { theme } from '@/theme'
export default function TabLayout() {
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
            name="lista"
            options={{
               title: 'Pedidos'
            }}
         />
      </Stack>
   )
}
