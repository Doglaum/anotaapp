import { useState } from 'react'
import {
   View,
   Text,
   StyleSheet,
   FlatList,
   TouchableOpacity
} from 'react-native'
import { Order } from '@/database/models'
import { OrderService } from '@/services'
import { commonStyles, theme } from '@/theme'
import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import { EmptyList } from '@/components/EmptyList'

const renderItem = ({ item }: { item: Order }) => (
   <View
      style={[
         commonStyles.listItem,
         item?.orderSituation?.orderSituationId === 2
            ? { backgroundColor: theme.colors.edit }
            : { backgroundColor: theme.colors.edit }
      ]}
   >
      <Text style={styles.itemText}>
         {item.orderId}
         {' - '}
         {item.client.name}
         {' - '}
         {item?.orderSituation?.name}
         {' - '}
      </Text>
   </View>
)

export default function Lista() {
   const [orders, setOrders] = useState<Order[]>([])
   const orderService = new OrderService()

   useFocusEffect(
      useCallback(() => {
         const loadOrders = async () => {
            try {
               const orders = await orderService.listAll()
               setOrders(orders)
            } catch (error) {
               console.error('Erro ao carregar pedidos:', error)
            }
         }

         loadOrders()
         return () => {
            console.log('Saindo da aba Pedidos')
         }
      }, [])
   )
   return (
      <View style={commonStyles.container}>
         <FlatList<Order>
            data={orders}
            keyExtractor={item => item.orderId.toString()}
            renderItem={renderItem}
            ListEmptyComponent={
               <EmptyList iconName="task" text="Nenhum produto cadastrado" />
            }
         />
      </View>
   )
}

const styles = StyleSheet.create({
   itemText: {
      fontSize: 16
   }
})
