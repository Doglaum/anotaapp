import { useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Order } from '@/database/models'
import { OrderService } from '@/services'
import { commonStyles, theme } from '@/theme'
import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import { EmptyList } from '@/components/EmptyList'
import DateRangeSelect from '@/components'
import { DateType } from 'react-native-ui-datepicker'

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
         {item.clientName}
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
            const orders = await orderService.listAllWithRangeDate(null, null)
            setOrders(orders)
         }

         loadOrders()
         return () => {
            console.log('Saindo da aba Pedidos')
         }
      }, [])
   )

   const handleDateSelect = async (startDate: DateType, endDate: DateType) => {
      console.log(startDate)
      console.log(endDate)
      const orders = await orderService.listAllWithRangeDate(startDate, endDate)
      setOrders(orders)
   }

   return (
      <View style={commonStyles.container}>
         <DateRangeSelect
            style={{ marginBottom: 10 }}
            onClose={handleDateSelect}
         />
         <FlatList<Order>
            data={orders}
            keyExtractor={item => item.orderId.toString()}
            renderItem={renderItem}
            ListEmptyComponent={
               <EmptyList
                  iconName="task"
                  text="Nenhum pedido para ser exibido"
               />
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
