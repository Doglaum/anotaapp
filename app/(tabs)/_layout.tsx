import { Tabs } from 'expo-router'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { theme } from '@/theme'
import { AntDesign } from '@expo/vector-icons'

export default function TabLayout() {
   return (
      <Tabs
         screenOptions={{
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: 'gray'
         }}
      >
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
            name="client"
            options={{
               tabBarLabel: 'Clientes',
               tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="people" size={size} color={color} />
               ),
               headerShown: false
            }}
         />
         <Tabs.Screen
            name="product"
            options={{
               tabBarLabel: 'Produtos',
               tabBarIcon: ({ color, size }) => (
                  <Entypo name="shop" size={size} color={color} />
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
