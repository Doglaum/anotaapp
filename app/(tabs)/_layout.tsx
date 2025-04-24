import { Tabs } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { theme } from '@/theme'

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
                  <MaterialIcons name="home" size={size} color={color} />
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
                  <MaterialIcons name="restaurant" size={size} color={color} />
               ),
               headerShown: false
            }}
         />
         <Tabs.Screen
            name="create-order"
            options={{
               tabBarLabel: 'Tirar Pedido',
               tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="add" size={size} color={color} />
               ),
               headerShown: false
            }}
         />
      </Tabs>
   )
}
