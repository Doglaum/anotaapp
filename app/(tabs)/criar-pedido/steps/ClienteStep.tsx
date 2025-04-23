import {
   View,
   Text,
   StyleSheet,
   FlatList,
   TouchableOpacity,
   TextInput
} from 'react-native'
import { commonStyles, theme } from '@/theme'
import { useState } from 'react'
import { Cliente, Pedido } from '@/database/models/'
import { ClienteService } from '@/services/ClienteService'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { EmptyList } from '@/components/EmptyList'

export const ClienteStep = ({
   pedido,
   atualizarPedido
}: {
   pedido: Partial<Pedido>
   atualizarPedido: <K extends keyof Pedido>(campo: K, valor: Pedido[K]) => void
}) => {
   const clienteService = new ClienteService()
   const [clientes, setClientes] = useState<Cliente[]>([])
   const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([])
   useFocusEffect(
      useCallback(() => {
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
         return () => {
            console.log('Saindo da aba Pedidos')
         }
      }, [])
   )

   const handleSearch = (text: string) => {
      const searchText = text.toLowerCase().trim()
      const filtered = clientes.filter(cliente => {
         const nome = cliente.nome?.toLowerCase() || ''
         const telefone = cliente.telefone?.toLowerCase() || ''
         return nome.includes(searchText) || telefone.includes(searchText)
      })
      setFilteredClientes(filtered)
   }

   const renderItem = ({ item }: { item: Cliente }) => {
      const isSelected = pedido.cliente?.id === item.id
      return (
         <TouchableOpacity onPress={() => atualizarPedido('cliente', item)}>
            <View
               style={[
                  commonStyles.listItem,
                  isSelected && { backgroundColor: theme.colors.primary }
               ]}
            >
               <Text
                  style={[
                     styles.clientName,
                     isSelected && { color: theme.colors.white }
                  ]}
               >
                  {item.nome}
               </Text>
               <Text
                  style={[
                     styles.clientName,
                     isSelected && { color: theme.colors.white }
                  ]}
               >
                  {item.telefone}
               </Text>
            </View>
         </TouchableOpacity>
      )
   }

   return (
      <View style={commonStyles.container}>
         <View style={commonStyles.searchContainer}>
            <TextInput
               style={commonStyles.input}
               placeholder="Pesquisar cliente"
               onChangeText={handleSearch}
            />
         </View>
         <FlatList<Cliente>
            data={filteredClientes}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            ListEmptyComponent={
               <EmptyList iconName="person" text="Nenhum cliente cadastrado" />
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
