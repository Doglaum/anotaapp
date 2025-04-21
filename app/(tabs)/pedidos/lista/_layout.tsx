import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Pedido } from '@/database/models'
import { PedidoService } from '@/services'
import { Stack } from 'expo-router'
import { commonStyles, theme } from '@/theme'
import { MaterialIcons } from '@expo/vector-icons'
import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import { EmptyList } from 'components/EmptyList'

const renderItem = ({ item }: { item: Pedido }) => (
   <View
      style={[
         commonStyles.listItem,
         item?.situacaoPedido?.id === 2
            ? { backgroundColor: theme.colors.edit }
            : { backgroundColor: theme.colors.edit }
      ]}
   >
      <Text style={styles.itemText}>
         {item.id}
         {' - '}
         {item.cliente.nome}
         {' - '}
         {item?.situacaoPedido?.nome}
         {' - '}
      </Text>
   </View>
)

export default function Lista() {
   const [pedidos, setPedidos] = useState<Pedido[]>([])
   const pedidoService = new PedidoService()

   useFocusEffect(
      useCallback(() => {
         const loadPedidos = async () => {
            try {
               const pedidos = await pedidoService.listarPedidos()
               setPedidos(pedidos)
            } catch (error) {
               console.error('Erro ao carregar pedidos:', error)
            }
         }

         loadPedidos()
         return () => {
            console.log('Saindo da aba Pedidos')
         }
      }, [])
   )
   return (
      <View style={commonStyles.container}>
         <FlatList<Pedido>
            data={pedidos}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            ListEmptyComponent={
               <EmptyList iconName="task" text="Nenhum produto cadastrado" />
            }
         />
      </View>
   )
}

const styles = StyleSheet.create({
   itemText: {
      fontSize: 16
   }
})
