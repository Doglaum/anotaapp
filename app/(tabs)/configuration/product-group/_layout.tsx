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
            name="list"
            options={{
               title: 'Agrupar produto'
            }}
         />
         <Stack.Screen
            name="register"
            options={{
               title: 'Criar grupo'
            }}
         />
         <Stack.Screen
            name="[id]"
            options={{
               title: 'Editar grupo'
            }}
         />
      </Stack>
   )
}

export default TabLayout
