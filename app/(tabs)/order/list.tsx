import { useEffect, useRef, useState } from 'react'
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
import { DateRangeSelect, OrderDetailsModal } from '@/components'
import { DateType } from 'react-native-ui-datepicker'
import dayjs from 'dayjs'
import { AntDesign } from '@expo/vector-icons'
import { usePrinter } from '@/context/PrinterContext'

export default function Lista() {
   const { print, isPrinting } = usePrinter()
   const [orders, setOrders] = useState<Order[]>([])
   const orderService = new OrderService()
   const [selectOrder, setSelectedOrder] = useState<Order>()
   const [openModal, setOpenModal] = useState<boolean>(false)
   const [totalValue, setTotalValue] = useState(0.0)
   const [totalDeliveryTax, setTotalDeliveryTax] = useState(0.0)

   useEffect(() => {
      const { total, totalDelivery } = getTotalOrderPrice()
      setTotalValue(total)
      setTotalDeliveryTax(totalDelivery)
   }, [orders])

   function getTotalOrderPrice(): { total: number; totalDelivery: number } {
      let totalOrder = 0.0
      let totalDelivery = 0.0
      orders.forEach(order => {
         if (order.deliveryFee) {
            totalOrder += order.deliveryFee
            totalDelivery += order.deliveryFee
         }
         if (order.orderProducts) {
            totalOrder += order.orderProducts.reduce((total, orderProduct) => {
               const productPrice = orderProduct.totalPrice
               return total + productPrice
            }, 0)
         }
      })
      return {
         total: parseFloat(totalOrder.toFixed(2)),
         totalDelivery: parseFloat(totalDelivery.toFixed(2))
      }
   }

   useFocusEffect(
      useCallback(() => {
         const loadOrders = async () => {
            const orders = await orderService.listAllWithDateRange(null, null)
            setOrders(orders)
         }
         loadOrders()
         return () => {
            console.log('Saindo da aba Pedidos')
         }
      }, [])
   )

   const handleDateSelect = async (startDate: DateType, endDate: DateType) => {
      const orders = await orderService.listAllWithDateRange(startDate, endDate)
      setOrders(orders)
   }

   const onCloseHandle = () => {
      setOpenModal(false)
   }

   const printHandle = async (item: Order) => {
      try {
         await print(item)
         //item.printed = true
         //orderService.updateOrder(item)
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <View style={{ flex: 1 }}>
         <DateRangeSelect
            style={{ marginBottom: 10 }}
            onClose={handleDateSelect}
         />
         <View style={commonStyles.container}>
            <FlatList<Order>
               data={orders}
               style={{ flex: 1 }}
               keyExtractor={item => item.orderId.toString()}
               renderItem={({ item }: { item: Order }) => (
                  <View
                     style={[
                        {
                           flex: 1,
                           marginBottom: 5,
                           backgroundColor: theme.colors.white,
                           borderRadius: 8,
                           borderWidth: 1,
                           borderColor: '#ddd',
                           flexDirection: 'row',
                           padding: 5,
                           paddingTop: 15,
                           paddingBottom: 15
                        },
                        item.printed && { backgroundColor: theme.colors.alert }
                     ]}
                  >
                     <TouchableOpacity
                        onPress={() => {
                           setSelectedOrder(item)
                           setOpenModal(true)
                        }}
                        style={{ flex: 1 }}
                     >
                        <View style={{ marginBottom: 3 }}>
                           <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                              {`#${item.orderId.toString().padStart(4, '0')}`}
                           </Text>
                        </View>
                        <View style={{}}>
                           <View style={{ flexDirection: 'row' }}>
                              <Text style={styles.itemText}>
                                 {item.clientName ?? 'Não informado'}
                                 {' - '}
                                 {`R$${item.totalPrice.toFixed(2)}`}
                              </Text>
                           </View>
                           <Text>{`Data do pedido: ${dayjs(
                              item.created_at
                           ).format('DD/MM/YYYY HH:mm')}`}</Text>
                        </View>
                     </TouchableOpacity>
                     {!isPrinting && (
                        <TouchableOpacity
                           style={{
                              marginLeft: 'auto',
                              height: '100%',
                              padding: 10,
                              justifyContent: 'center'
                           }}
                           onPress={() => printHandle(item)}
                        >
                           <AntDesign name="printer" size={20} />
                        </TouchableOpacity>
                     )}
                  </View>
               )}
               ListEmptyComponent={
                  <EmptyList
                     iconName="task"
                     text="Nenhum pedido para ser exibido"
                  />
               }
            />
            <OrderDetailsModal
               order={selectOrder || ({} as Order)}
               openModal={openModal}
               onClose={onCloseHandle}
            ></OrderDetailsModal>
         </View>
         <View
            style={{
               padding: 10,
               backgroundColor: theme.colors.primary,
               flexDirection: 'row',
               justifyContent: 'space-between'
            }}
         >
            <Text
               style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: theme.colors.white
               }}
            >
               {`Total: R$${totalValue.toFixed(2)}`}
            </Text>
            <Text
               style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: theme.colors.white
               }}
            >
               {`Entregas: R$${totalDeliveryTax.toFixed(2)}`}
            </Text>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   itemText: {
      fontSize: 16
   }
})
