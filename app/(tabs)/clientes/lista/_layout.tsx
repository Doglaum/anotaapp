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
import { useState, useEffect } from 'react'
import { Cliente } from '@models/Cliente'
import { ClienteService } from '@/services/ClienteService'
import { EmptyList } from 'components/EmptyList'

export default function Clientes() {
   const router = useRouter()
   const [clientes, setClientes] = useState<Cliente[]>([])
   const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([])
   const clienteService = new ClienteService()

   useEffect(() => {
      const loadClientes = async () => {
         try {
            const clientes = await clienteService.listarClientes()
            setClientes(clientes)
            setFilteredClientes(clientes)
         } catch (error) {
            console.error('Erro ao carregar clientes:', error)
         }
      }

      loadClientes()
   }, [])

   const handleDelete = async (id: number) => {
      await clienteService.excluirCliente(id)
      const newList = clientes.filter(p => p.id !== id)
      setClientes(() => newList)
      setFilteredClientes(() => newList)
   }

   return (
      <View style={commonStyles.container}>
         <Stack.Screen
            options={{
               title: 'Clientes'
            }}
         />
         <View style={commonStyles.searchContainer}>
            <TextInput
               style={commonStyles.input}
               placeholder="Pesquisar cliente"
               onChangeText={text => {
                  const filteredClientes = clientes.filter(produto =>
                     produto.nome.toLowerCase().includes(text.toLowerCase())
                  )
                  setFilteredClientes(filteredClientes)
               }}
            />
            <TouchableOpacity
               style={commonStyles.addButton}
               onPress={() => router.push('/clientes/cadastro')}
            >
               <MaterialIcons name="add" size={24} color="#fff" />
            </TouchableOpacity>
         </View>
         <FlatList<Cliente>
            data={filteredClientes}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
               <View style={commonStyles.listItem}>
                  <View>
                     <Text style={[styles.clientName]}>
                        {item.nome} {' - '} {item.telefone}
                     </Text>
                  </View>
                  <View style={styles.clienteActions}>
                     <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() =>
                           router.push(`/clientes/editar/${item.id}`)
                        }
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
