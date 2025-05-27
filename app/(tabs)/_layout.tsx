import { Tabs } from 'expo-router'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { theme } from '@/theme'

export default function TabLayout() {
   return (
      <Tabs
         screenOptions={{
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.gray
         }}
      >
         <Tabs.Screen
            name="configuration"
            options={{
               tabBarLabel: 'Configurações',
               tabBarIcon: ({ color, size }) => (
                  <MaterialIcons
                     name="app-settings-alt"
                     size={size}
                     color={color}
                  />
               ),
               headerShown: false
            }}
         />
         <Tabs.Screen
            name="order"
            options={{
               tabBarLabel: 'Pedidos',
               tabBarIcon: ({ color, size }) => (
                  <Entypo name="ticket" size={size} color={color} />
               ),
               headerShown: false
            }}
         />
         <Tabs.Screen
            name="create-order"
            options={{
               tabBarLabel: 'Tirar Pedido',
               tabBarIcon: ({ color, size }) => (
                  <Entypo name="new-message" size={size} color={color} />
               ),
               headerShown: false
            }}
         />
      </Tabs>
   )
}
