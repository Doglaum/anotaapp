import {
   View,
   Text,
   StyleSheet,
   FlatList,
   TouchableOpacity,
   ScrollView
} from 'react-native'
import { commonStyles, theme } from '@/theme'
import { useEffect, useState } from 'react'
import { Client, Order } from '@/database/models/'
import { ClientService } from '@/services/ClientService'
import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import { FormSearchInput, CreateClientModal, EmptyList } from '@/components/'

const ClientStep = ({
   order,
   insertOrderData
}: {
   order: Partial<Order>
   insertOrderData: <K extends keyof Order>(campo: K, valor: Order[K]) => void
}) => {
   const clientService = new ClientService()
   const [clients, setClients] = useState<Client[]>([])
   const [filteredClients, setFilteredClients] = useState<Client[]>([])
   const [filterText, setFilterText] = useState<string>('')

   useFocusEffect(
      useCallback(() => {
         const loadClients = async () => {
            try {
               const clientes = await clientService.listAll()
               setClients(clientes)
               setFilteredClients(clientes)
            } catch (error) {
               console.error('Erro ao carregar clientes:', error)
            }
         }
         loadClients()
      }, [])
   )

   useEffect(() => {
      const handleSearch = (text: string) => {
         const searchText = text.toLowerCase().trim()
         const filtered = clients.filter(client => {
            const name = client.name?.toLowerCase() || ''
            const phoneNumber = client.phoneNumber?.toLowerCase() || ''
            return name.includes(searchText) || phoneNumber.includes(searchText)
         })
         setFilteredClients(filtered)
      }
      handleSearch(filterText)
   }, [filterText])

   const handleOnSaveClient = (client: Client) => {
      setClients(prev => [client, ...prev])
      setFilteredClients(prev => [client, ...prev])
   }
   return (
      <View style={commonStyles.container}>
         <View style={{ marginBottom: 10, flexDirection: 'row' }}>
            <FormSearchInput
               onChange={setFilterText}
               label="Nome, telefone"
               value={filterText}
               style={{ flex: 1 }}
            />

            <CreateClientModal onSave={handleOnSaveClient} />
         </View>
         <ScrollView keyboardShouldPersistTaps="handled">
            {filteredClients &&
               filteredClients.map((item, index) => {
                  const isSelected = order.client?.clientId === item.clientId
                  return (
                     <TouchableOpacity
                        key={index}
                        onPress={() => {
                           insertOrderData('client', item)
                           insertOrderData('clientName', item.name)
                        }}
                     >
                        <View
                           style={[
                              commonStyles.listItem,
                              isSelected && {
                                 backgroundColor: theme.colors.primary
                              }
                           ]}
                        >
                           <Text
                              style={[
                                 styles.label,
                                 isSelected && { color: theme.colors.white }
                              ]}
                           >
                              {item.name}
                           </Text>
                           <Text
                              style={[
                                 styles.label,
                                 isSelected && { color: theme.colors.white }
                              ]}
                           >
                              {item.phoneNumber}
                           </Text>
                        </View>
                     </TouchableOpacity>
                  )
               })}
         </ScrollView>
      </View>
   )
}

const styles = StyleSheet.create({
   label: {
      fontSize: 16,
      fontWeight: 'bold'
   }
})

export default ClientStep
