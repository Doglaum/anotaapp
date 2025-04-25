import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { commonStyles, theme } from '@/theme'
import { PaymentMethod, OrderSituation, Order } from '@/database/models/'
import { OrderSituationService, PaymentMethodService } from '@/services'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import CurrencyInput from 'react-native-currency-input'
import { FormCurrencyInput, FormSelectInput, SelectInput } from '@/components'

export const AdditionalInformationsStep = ({
   order,
   insertOrderData
}: {
   order: Partial<Order>
   insertOrderData: <K extends keyof Order>(campo: K, valor: Order[K]) => void
}) => {
   const paymentMethodService = new PaymentMethodService()
   const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>()
   const orderSituationService = new OrderSituationService()
   const [orderSituations, setOrderSituations] = useState<OrderSituation[]>()

   useFocusEffect(
      useCallback(() => {
         const loadSelectData = async () => {
            try {
               const paymentMethods = await paymentMethodService.listAll()
               setPaymentMethods(paymentMethods)
               const orderSituations = await orderSituationService.listAll()
               setOrderSituations(orderSituations)
            } catch (error) {
               console.error('Erro ao carregar formas de pagamento:', error)
            }
         }
         loadSelectData()
         return () => {
            console.log('pedido produto step')
         }
      }, [])
   )

   const selectHandle = (name: any, text: any) => {
      insertOrderData(name, text)
   }

   return (
      <ScrollView style={commonStyles.container}>
         <FormSelectInput<Order>
            onChange={selectHandle}
            data={paymentMethods || []}
            label="Selecione a forma de pagamento"
            labelField="name"
            valueField="id"
            name="paymentMethod"
         />
         <FormSelectInput<Order>
            onChange={selectHandle}
            data={orderSituations || []}
            label="Selecione a situação do pedido"
            labelField="name"
            valueField="id"
            name="orderSituation"
         />
         <FormCurrencyInput
            label="Troco"
            name="changeFor"
            onChange={selectHandle}
            value={order.changeFor}
         />
         <FormCurrencyInput
            label="Tx. Entrega"
            name="deliveryFee"
            onChange={selectHandle}
            value={order.deliveryFee}
         />
         <View style={{ marginTop: 16 }}>
            <Text style={styles.modalTitle}>
               Valor total: R${order.totalPrice?.toFixed(2)}
            </Text>
         </View>
      </ScrollView>
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
   modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16
   }
})
