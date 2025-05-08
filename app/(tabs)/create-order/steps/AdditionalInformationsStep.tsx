import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react'
import { theme } from '@/theme'
import {
   PaymentMethod,
   OrderSituation,
   Order,
   PaymentStatus
} from '@/database/models/'
import {
   OrderSituationService,
   PaymentMethodService,
   PaymentStatusService
} from '@/services'
import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import { FormCurrencyInput, FormSelectInput } from '@/components'

const AdditionalInformationsStep = ({
   order,
   insertOrderData
}: {
   order: Partial<Order>
   insertOrderData: <K extends keyof Order>(campo: K, valor: Order[K]) => void
}) => {
   const paymentMethodService = new PaymentMethodService()
   const [paymentMethodsList, setPaymentMethodsList] =
      useState<PaymentMethod[]>()
   const paymentStatusService = new PaymentStatusService()
   const [paymenStatusList, setPaymentStatusList] = useState<PaymentStatus[]>()

   useFocusEffect(
      useCallback(() => {
         const loadSelectData = async () => {
            try {
               const paymentMethods = await paymentMethodService.listAll()
               setPaymentMethodsList(paymentMethods)
               const paymentStatusList = await paymentStatusService.listAll()
               setPaymentStatusList(paymentStatusList)
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
      console.log(text)
      insertOrderData(name, text)
   }

   const changeHandle = (name: any, text: any) => {
      insertOrderData(name, text)
   }

   return (
      <View style={{ flex: 1 }}>
         <View style={{ marginTop: 10, gap: 10 }}>
            <FormSelectInput<Order>
               onChange={selectHandle}
               data={paymenStatusList || []}
               label="Situação do pagamento"
               labelField="name"
               valueField="id"
               name="paymentStatus"
               placeholder="Pago, Pedente, Cancelado"
            />
            <FormSelectInput<Order>
               onChange={selectHandle}
               data={paymentMethodsList || []}
               label="Forma de pagamento"
               labelField="name"
               valueField="id"
               name="paymentMethod"
               placeholder="PIX, Crédito, Débito, Dinheiro"
            />
            <FormCurrencyInput
               label="Troco"
               name="changeFor"
               onChange={changeHandle}
               value={order.changeFor}
            />
            <FormCurrencyInput
               label="Tx. Entrega"
               name="deliveryFee"
               onChange={changeHandle}
               value={order.deliveryFee}
            />
            <View style={{ marginTop: 16 }}>
               <Text style={styles.modalTitle}>
                  Valor total: R${order.totalPrice?.toFixed(2)}
               </Text>
            </View>
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

export default AdditionalInformationsStep
