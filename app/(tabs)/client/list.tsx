import {
   View,
   Text,
   StyleSheet,
   FlatList,
   TouchableOpacity,
   TextInput
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { commonStyles, theme } from '@/theme'
import { Stack, useRouter } from 'expo-router'
import { useState, useCallback } from 'react'
import { Client } from '@/database/models/Client'
import { ClientService } from '@/services/ClientService'
import { EmptyList } from '@/components/EmptyList'
import { useFocusEffect } from '@react-navigation/native'

export default function Clients() {
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
      const newList = clients.filter(p => p.id !== id)
      setClients(() => newList)
      setFilteredClients(() => newList)
   }

   return (
      <View style={commonStyles.container}>
         <View style={commonStyles.searchContainer}>
            <TextInput
               style={commonStyles.input}
               placeholder="Pesquisar cliente"
               onChangeText={text => {
                  const filteredClients = clients.filter(client =>
                     client.name.toLowerCase().includes(text.toLowerCase())
                  )
                  setFilteredClients(filteredClients)
               }}
            />
            <TouchableOpacity
               style={commonStyles.addButton}
               onPress={() => router.push('/client/register')}
            >
               <MaterialIcons name="add" size={24} color="#fff" />
            </TouchableOpacity>
         </View>
         <FlatList<Client>
            data={filteredClients}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
               <View style={commonStyles.listItem}>
                  <View>
                     <Text style={[styles.clientName]}>
                        {item.name} {' - '} {item.phoneNumber}
                     </Text>
                  </View>
                  <View style={styles.clienteActions}>
                     <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => router.push(`/client/${item.id}`)}
                     >
                        <MaterialIcons
                           name="edit"
                           size={24}
                           color={theme.colors.edit}
                        />
                     </TouchableOpacity>
                     <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleDelete(item.id)}
                     >
                        <MaterialIcons
                           name="delete"
                           size={24}
                           color={theme.colors.delete}
                        />
                     </TouchableOpacity>
                  </View>
               </View>
            )}
            ListEmptyComponent={
               <EmptyList iconName="person" text="Nenhum cliente cadastrado" />
            }
         />
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
