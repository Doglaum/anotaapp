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
            name="pedido"
            options={{
               tabBarLabel: 'Pedidos',
               tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="home" size={size} color={color} />
               ),
               headerShown: false
            }}
         />
         <Tabs.Screen
            name="cliente"
            options={{
               tabBarLabel: 'Clientes',
               tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="people" size={size} color={color} />
               ),
               headerShown: false
            }}
         />
         <Tabs.Screen
            name="produtos"
            options={{
               tabBarLabel: 'Produtos',
               tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="restaurant" size={size} color={color} />
               ),
               headerShown: false
            }}
         />
         <Tabs.Screen
            name="criar-pedido"
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
