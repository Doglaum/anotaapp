import { View, TouchableOpacity, Text } from 'react-native'
import { commonStyles, theme } from '@/theme'
import { Stack, router } from 'expo-router'

export default function PedidoForm() {
   return (
      <View style={commonStyles.container}>
         <Stack.Screen
            options={{
               title: 'Selecionar tipo pedido',
               headerStyle: {
                  backgroundColor: theme.colors.primary
               },
               headerTintColor: theme.colors.white
            }}
         />
         <View
            style={{
               alignItems: 'center',
               justifyContent: 'center',
               gap: 100,
               flex: 1
            }}
         >
            <TouchableOpacity
               style={[commonStyles.editButton, { width: '100%' }]}
               onPress={() => router.replace('(tabs)/create-order/pickupOrder')}
            >
               <View>
                  <Text style={commonStyles.editButtonText}>Balcão</Text>
               </View>
            </TouchableOpacity>
            <TouchableOpacity
               style={[commonStyles.addButton, { width: '100%' }]}
               onPress={() =>
                  router.replace('(tabs)/create-order/deliveryOrder')
               }
            >
               <View>
                  <Text style={commonStyles.addButtonText}>Entrega</Text>
               </View>
            </TouchableOpacity>
         </View>
      </View>
   )
}
