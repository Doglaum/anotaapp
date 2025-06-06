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
            name="list"
            options={{
               title: 'Clientes'
            }}
         />
         <Stack.Screen
            name="register"
            options={{
               title: 'Cadastrar cliente'
            }}
         />
         <Stack.Screen
            name="[id]"
            options={{
               title: 'Editar cliente'
            }}
         />
      </Stack>
   )
}
