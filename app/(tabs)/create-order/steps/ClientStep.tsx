import {
   View,
   Text,
   StyleSheet,
   FlatList,
   TouchableOpacity,
   TextInput
} from 'react-native'
import { commonStyles, theme } from '@/theme'
import { useEffect, useState } from 'react'
import { Client, Order } from '@/database/models/'
import { ClientService } from '@/services/ClientService'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { EmptyList } from '@/components/EmptyList'
import { router } from 'expo-router'

export const ClientStep = ({
   order,
   insertOrderData
}: {
   order: Partial<Order>
   insertOrderData: <K extends keyof Order>(campo: K, valor: Order[K]) => void
}) => {
   const clientService = new ClientService()
   const [clients, setClients] = useState<Client[]>([])
   const [filteredClients, setFilteredClients] = useState<Client[]>([])
   const [openModal, setOpenModal] = useState<boolean>(false)
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
         return () => {
            console.log('Saindo da aba Pedidos')
         }
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

   return (
      <View style={commonStyles.container}>
         <View style={commonStyles.searchContainer}>
            <TextInput
               style={commonStyles.input}
               placeholder="Nome, telefone"
               onChangeText={setFilterText}
               value={filterText}
            />
         </View>
         <FlatList<Client>
            data={filteredClients}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }: { item: Client }) => {
               const isSelected = order.client?.id === item.id
               return (
                  <TouchableOpacity
                     onPress={() => insertOrderData('client', item)}
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
                              styles.clientName,
                              isSelected && { color: theme.colors.white }
                           ]}
                        >
                           {item.name}
                        </Text>
                        <Text
                           style={[
                              styles.clientName,
                              isSelected && { color: theme.colors.white }
                           ]}
                        >
                           {item.phoneNumber}
                        </Text>
                     </View>
                  </TouchableOpacity>
               )
            }}
            ListEmptyComponent={
               <View>
                  <EmptyList
                     iconName="person"
                     text="Nenhum cliente encontrado"
                  />
                  <TouchableOpacity
                     style={commonStyles.addButton}
                     onPress={() => router.push('/client/register')}
                  >
                     <Text
                        style={[
                           commonStyles.addButtonText,
                           { flex: 1, textAlign: 'center' }
                        ]}
                     >
                        Cadastrar
                     </Text>
                  </TouchableOpacity>
               </View>
            }
         />
      </View>
   )
}

const styles = StyleSheet.create({
   clientName: {
      fontSize: 16,
      fontWeight: 'bold'
   }
})
