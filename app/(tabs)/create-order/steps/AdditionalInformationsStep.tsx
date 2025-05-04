import {
   View,
   Text,
   StyleSheet,
   ScrollView,
   KeyboardAvoidingView,
   Platform
} from 'react-native'
import { useState, useEffect } from 'react'
import { commonStyles, theme } from '@/theme'
import { PaymentMethod, OrderSituation, Order } from '@/database/models/'
import { OrderSituationService, PaymentMethodService } from '@/services'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import CurrencyInput from 'react-native-currency-input'
import { FormCurrencyInput, FormSelectInput, FormTextInput } from '@/components'

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
      <View style={{ marginTop: 10, gap: 10 }}>
         <FormSelectInput<Order>
            onChange={selectHandle}
            data={paymentMethods || []}
            label="Forma de pagamento"
            labelField="name"
            valueField="id"
            name="paymentMethod"
            placeholder="PIX, Crédito, Débito, Dinheiro"
         />
         <FormSelectInput<Order>
            onChange={selectHandle}
            data={orderSituations || []}
            label="Situação do pedido"
            labelField="name"
            valueField="id"
            name="orderSituation"
            placeholder="Pago, Pedente, Cancelado"
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
         <FormTextInput
            label="teste"
            name="teste"
            onChange={() => {}}
            value={order.totalPrice}
         />
         <View style={{ marginTop: 16 }}>
            <Text style={styles.modalTitle}>
               Valor total: R${order.totalPrice?.toFixed(2)}
            </Text>
         </View>
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
   modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16
   }
})
