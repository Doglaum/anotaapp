import { View, StyleSheet } from 'react-native'
import { commonStyles } from '@/theme'
import { useState } from 'react'
import { Client, Order } from '@/database/models/'
import { FormTextInput } from '@/components'

export const ClientNameStep = ({
   order,
   insertOrderData
}: {
   order: Partial<Order>
   insertOrderData: <K extends keyof Order>(campo: K, valor: Order[K]) => void
}) => {
   const [client, setClient] = useState<Partial<Client>>({
      name: ''
   })

   const handleClientName = (field: string, textName: string) => {
      setClient(prev => ({
         ...prev,
         [field]: textName
      }))
      insertOrderData('client', { name: textName } as Client)
   }
   return (
      <View style={commonStyles.container}>
         <View>
            <FormTextInput
               label="Nome"
               name="name"
               value={client.name}
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
