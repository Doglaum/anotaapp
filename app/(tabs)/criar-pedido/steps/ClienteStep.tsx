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
import { Cliente } from '@models/Cliente'
import { ClienteService } from '@/services/ClienteService'
import { Pedido } from '@/database/models'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { EmptyList } from 'components/EmptyList'

export default function ClienteStep({
   pedido,
   atualizarPedido
}: {
   pedido: Partial<Pedido>
   atualizarPedido: <K extends keyof Pedido>(campo: K, valor: Pedido[K]) => void
}) {
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
      const searchText = text.toLowerCase().trim() // Remove espaços extras e converte para minúsculas
      const filtered = clientes.filter(cliente => {
         const nome = cliente.nome?.toLowerCase() || '' // Garante que nome seja uma string
         const telefone = cliente.telefone?.toLowerCase() || '' // Garante que telefone seja uma string
         return nome.includes(searchText) || telefone.includes(searchText) // Verifica se o texto está no nome ou telefone
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
                  { flexDirection: 'column' },
                  isSelected && { backgroundColor: theme.colors.primary }
               ]}
            >
               <Text
                  style={[
                     styles.clientName,
                     isSelected && { color: theme.colors.white }
                  ]}
               >
                  {item.nome} {' - '} {item.telefone}
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
   container: {
      flex: 1,
      backgroundColor: '#fff'
   },
   clientName: {
      fontSize: 16,
      fontWeight: 'bold'
   }
})
