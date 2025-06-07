import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { theme } from '@/theme'
import { Order } from '@/database/models/index'
import { OrderService } from '@/services/OrderService'
import { router, Stack } from 'expo-router'
import {
   OrderProductStep,
   AdditionalInformationsStep,
   ClientNameStep,
   OrderSummaryStep
} from './steps'
import ShoppingCart from './components/ShoppingCart'
import { MaterialIcons } from '@expo/vector-icons'
import { errorToast, infoToast } from '@/components'
import { usePrinter } from '@/context/PrinterContext'

const PedidoForm = () => {
   const { print } = usePrinter()
   const orderService = new OrderService()
   const [modalVisible, setModalVisible] = useState(false)
   const [order, setOrder] = useState<Partial<Order>>({
      changeFor: 0,
      deliveryFee: 0
   })
   const insertOrderData = <K extends keyof Order>(
      attribute: K,
      value: Order[K]
   ) => {
      setOrder(prev => ({ ...prev, [attribute]: value }))
   }
   const [step, setStep] = useState(1)
   const handleNextStep = () => {
      if (step === 1 && !order.clientName) {
         infoToast('Nome do cliente não informado')
      } else if (
         (step === 2 && !order?.orderProducts) ||
         order?.orderProducts?.length == 0
      ) {
         errorToast('Adicione pelo menos 1 produto ao pedido')
         return
      } else if (step === 4) return
      setStep(step + 1)
   }

   const handlePreviousStep = () => {
      if (step === 1) return
      setStep(step - 1)
   }

   const handleSubmit = async () => {
      const newOrder = await orderService.createOrder(order)
      print(newOrder as Order)
      router.replace('(tabs)/create-order')
   }

   useEffect(() => {
      const total = getTotalOrderPrice()
      insertOrderData('totalPrice', total)
   }, [order.deliveryFee, order.orderProducts])

   function getTotalOrderPrice(): number {
      let totalOrder = 0
      if (order.orderProducts) {
         totalOrder += order.orderProducts.reduce((total, orderProduct) => {
            const productPrice = orderProduct.totalPrice
            return total + productPrice
         }, 0)
      }
      return parseFloat(totalOrder.toFixed(2))
   }

   return (
      <View style={{ flex: 1 }}>
         <Stack.Screen
            options={{
               title:
                  step === 1
                     ? 'Cliente'
                     : step === 2
                     ? 'Selecionar Produto'
                     : step === 3
                     ? 'Mais Informações'
                     : 'Resumo do pedido',
               headerStyle: {
                  backgroundColor: theme.colors.primary
               },
               headerTintColor: theme.colors.white
            }}
         />
         <View
            style={[
               {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  zIndex: 999,
                  backgroundColor: theme.colors.appContainerColor,
                  padding: 16
               }
            ]}
         >
            <View
               style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 3
               }}
            >
               {[1, 2, 3, 4].map(num => (
                  <View
                     key={num}
                     style={[
                        styles.stepBox,
                        step === num && styles.activeStepBox
                     ]}
                  >
                     <Text
                        style={[
                           styles.stepText,
                           step === num && styles.activeStepText
                        ]}
                     >
                        {num}
                     </Text>
                  </View>
               ))}
            </View>
            <TouchableOpacity
               style={styles.cartButton}
               onPress={() => setModalVisible(true)}
            >
               <MaterialIcons name="shopping-cart" size={22} color="#fff" />
               <Text style={styles.cartButtonText}>Carrinho</Text>
            </TouchableOpacity>
         </View>
         <View style={{ flex: 1 }}>
            <View style={{ display: step === 1 ? 'flex' : 'none', flex: 1 }}>
               <ClientNameStep
                  order={order}
                  insertOrderData={insertOrderData}
               />
            </View>
            <View style={{ display: step === 2 ? 'flex' : 'none', flex: 1 }}>
               <OrderProductStep
                  order={order}
                  insertOrderData={insertOrderData}
               />
            </View>
            <View style={{ display: step === 3 ? 'flex' : 'none', flex: 1 }}>
               <AdditionalInformationsStep
                  order={order}
                  insertOrderData={insertOrderData}
               />
            </View>
            <View
               style={{
                  display: step === 4 ? 'flex' : 'none',
                  flex: 1
               }}
            >
               <OrderSummaryStep order={order} />
            </View>
         </View>
         <View
            style={{
               flexDirection: 'row',
               justifyContent: 'space-around',
               paddingBottom: 10,
               paddingTop: 10,
               backgroundColor: theme.colors.white
            }}
         >
            <View>
               <TouchableOpacity
                  style={[
                     styles.roundedButton,
                     { opacity: step === 1 ? 0 : 1 }
                  ]}
                  onPress={handlePreviousStep}
               >
                  <MaterialIcons name="arrow-back" size={24} color="#fff" />
               </TouchableOpacity>
            </View>
            <View>
               {step < 4 && (
                  <TouchableOpacity
                     style={styles.roundedButton}
                     onPress={handleNextStep}
                  >
                     <MaterialIcons
                        name="arrow-forward"
                        size={24}
                        color="#fff"
                     />
                  </TouchableOpacity>
               )}
               {step === 4 && (
                  <TouchableOpacity
                     style={[
                        styles.roundedButton,
                        { backgroundColor: theme.colors.edit }
                     ]}
                     onPress={handleSubmit}
                  >
                     <MaterialIcons name="check" size={24} color="#ffffff" />
                  </TouchableOpacity>
               )}
            </View>
         </View>
         <ShoppingCart
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            order={order}
            insertOrderData={insertOrderData}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   formGroup: {
      marginBottom: 16
   },
   label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
      color: theme.colors.text
   },
   input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: '#fff'
   },
   textArea: {
      height: 100,
      textAlignVertical: 'top'
   },
   button: {
      backgroundColor: theme.colors.primary,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16
   },
   buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
   },
   cartButton: {
      backgroundColor: theme.colors.primary,
      alignSelf: 'flex-end',
      padding: 10,
      borderRadius: 30,
      flexDirection: 'row',
      alignItems: 'center'
   },
   cartButtonText: {
      color: '#fff',
      fontWeight: 'bold'
   },
   roundedButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 25,
      alignItems: 'center'
   },
   roundedButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
   },
   stepBox: {
      width: 40,
      height: 40,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff'
   },
   activeStepBox: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary
   },
   stepText: {
      fontSize: 16,
      color: '#000'
   },
   activeStepText: {
      color: '#fff'
   }
})

export default PedidoForm
