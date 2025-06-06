import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   ScrollView
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { commonStyles, theme } from '@/theme'
import { useRouter } from 'expo-router'
import { useState, useCallback } from 'react'
import { Client } from '@/database/models/Client'
import { ClientService } from '@/services/ClientService'
import { useFocusEffect } from 'expo-router'
import { FormSearchInput } from '@/components/form-inputs/FormSearchInput'
import { successToast, useConfirmModal } from '@/components'

export default function Clients() {
   const { confirm, Confirm } = useConfirmModal()
   const router = useRouter()
   const [clients, setClients] = useState<Client[]>([])
   const [filteredClients, setFilteredClients] = useState<Client[]>([])
   const clientService = new ClientService()

   useFocusEffect(
      useCallback(() => {
         const loadOrders = async () => {
            try {
               const clients = await clientService.listAll()
               setClients(clients)
               setFilteredClients(clients)
            } catch (error) {
               console.error('Erro ao carregar clientes:', error)
            }
         }

         loadOrders()
         return () => {
            console.log('Saindo da aba Pedidos')
         }
      }, [])
   )

   const handleDelete = async (id: number) => {
      await clientService.delete(id)
      const newList = clients.filter(p => p.clientId !== id)
      setClients(() => newList)
      setFilteredClients(() => newList)
      successToast('Cliente removido com sucesso!')
   }

   const handleSearch = (text: string) => {
      const filteredClients = clients.filter(
         client =>
            client.name.toLowerCase().includes(text.toLowerCase()) ||
            client.phoneNumber.toLowerCase().includes(text.toLowerCase())
      )
      setFilteredClients(filteredClients)
   }

   const deleteClientHandle = async (clientToRemove: Client) => {
      const result = await confirm(
         `Deseja remover o cliente ${clientToRemove.name}?`
      )
      if (result) {
         handleDelete(clientToRemove.clientId)
      }
   }

   return (
      <View style={commonStyles.container}>
         <FormSearchInput
            onChange={handleSearch}
            label="Digite nome ou numero..."
            rota="/configuration/client/register"
            style={{ marginBottom: 20 }}
         />
         <ScrollView keyboardShouldPersistTaps="handled">
            {filteredClients &&
               filteredClients.map((item, index) => (
                  <View key={index} style={commonStyles.listItem}>
                     <View>
                        <Text style={[styles.clientName]}>
                           {item.name}
                           {item.phoneNumber ? ' - ' + item.phoneNumber : null}
                        </Text>
                        {item.addresses && (
                           <Text style={{ fontSize: 12, fontWeight: '400' }}>
                              {item.addresses[0]?.street}
                              {item.addresses[0]?.number
                                 ? ' - ' + item.addresses[0]?.number
                                 : null}
                           </Text>
                        )}
                     </View>
                     <View style={[styles.clienteActions]}>
                        <TouchableOpacity
                           style={styles.actionButton}
                           onPress={() =>
                              router.push(
                                 `/configuration/client/${item.clientId}`
                              )
                           }
                        >
                           <MaterialIcons
                              name="edit"
                              size={20}
                              color={theme.colors.edit}
                           />
                        </TouchableOpacity>
                        <TouchableOpacity
                           style={styles.actionButton}
                           onPress={() => deleteClientHandle(item)}
                        >
                           <MaterialIcons
                              name="delete"
                              size={20}
                              color={theme.colors.delete}
                           />
                        </TouchableOpacity>
                     </View>
                  </View>
               ))}
            {Confirm}
         </ScrollView>
      </View>
   )
}

const styles = StyleSheet.create({
   clienteName: {
      fontSize: 16,
      fontWeight: 'bold'
   },
   clienteActions: {
      flexDirection: 'row'
   },
   actionButton: {
      marginLeft: 16
   },
   emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 32
   },
   emptyText: {
      fontSize: 16,
      color: '#666',
      marginTop: 16
   },
   clientName: {
      fontSize: 16,
      fontWeight: 'bold'
   }
})
