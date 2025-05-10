import { View, StyleSheet } from 'react-native'
import { commonStyles } from '@/theme'
import { useState } from 'react'
import { Order } from '@/database/models/'
import { FormTextInput } from '@/components'

const ClientNameStep = ({
   order,
   insertOrderData
}: {
   order: Partial<Order>
   insertOrderData: <K extends keyof Order>(campo: K, valor: Order[K]) => void
}) => {
   const [clientName, setClientName] = useState<string>('')

   const handleClientName = (field: string, clientName: string) => {
      setClientName(clientName)
      insertOrderData('clientName', clientName)
   }
   return (
      <View style={commonStyles.container}>
         <View>
            <FormTextInput
               label="Nome"
               name="name"
               value={order.clientName}
               onChange={handleClientName}
            />
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   clientName: {
      fontSize: 16,
      fontWeight: 'bold'
   }
})

export default ClientNameStep
