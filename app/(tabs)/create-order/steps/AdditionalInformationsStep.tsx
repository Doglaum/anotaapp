import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { commonStyles, theme } from '@/theme'
import { PaymentMethod, OrderSituation, Order } from '@/database/models/'
import { OrderSituationService, PaymentMethodService } from '@/services'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import CurrencyInput from 'react-native-currency-input'
import { SelectInput } from '@/components'

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

   return (
      <ScrollView style={commonStyles.container}>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Forma de Pagamento</Text>
            <SelectInput
               data={paymentMethods || []}
               labelField="nome"
               valueField="id"
               placeholder="Selecione a forma de pagamento"
               onChange={value => insertOrderData('paymentMethod', value)}
            />
         </View>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Situação Pedido</Text>
            <SelectInput
               data={orderSituations || []}
               labelField="nome"
               valueField="id"
               placeholder="Selecione a situação do pedido"
               onChange={item => insertOrderData('orderSituation', item)}
            />
         </View>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Troco</Text>
            <CurrencyInput
               style={commonStyles.input}
               value={order.changeFor || 0.0}
               onChangeValue={item => insertOrderData('changeFor', item || 0.0)}
               placeholder="Digite o troco"
               keyboardType="numeric"
               minValue={0}
               delimiter="."
               separator=","
               inputMode="decimal"
            />
         </View>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Taxa Entrega</Text>
            <CurrencyInput
               style={commonStyles.input}
               value={order.deliveryFee || 0}
               onChangeValue={item =>
                  insertOrderData('deliveryFee', item || 0.0)
               }
               placeholder="Digite a taxa de entrega"
               keyboardType="numeric"
               minValue={0}
               delimiter="."
               separator=","
               inputMode="decimal"
            />
         </View>
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
