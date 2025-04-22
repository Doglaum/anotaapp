import {
   View,
   Text,
   StyleSheet,
   FlatList,
   Modal,
   Button,
   TouchableOpacity
} from 'react-native'
import { Pedido } from '@/database/models/Pedido'
import { MaterialIcons } from '@expo/vector-icons'
import { EmptyList } from '@/components/EmptyList'

export default function Carrinho({
   visible,
   onClose,
   pedido,
   atualizarPedido
}: {
   visible: boolean
   onClose: () => void
   pedido: Partial<Pedido>
   atualizarPedido: <K extends keyof Pedido>(campo: K, valor: Pedido[K]) => void
}) {
   function onRemoveItem(index: number) {
      if (pedido.pedidoProdutos) {
         const updatedPedidoProdutos = pedido.pedidoProdutos.filter(
            (_, i) => i !== index
         )
         atualizarPedido('pedidoProdutos', updatedPedidoProdutos)
      }
   }
   return (
      <Modal
         visible={visible}
         transparent={true}
         animationType="slide"
         onRequestClose={onClose}
      >
         <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
               <Text style={styles.modalTitle}>
                  {pedido?.cliente?.nome
                     ? `Carrinho de ${pedido.cliente.nome}`
                     : 'Carrinho'}
               </Text>
               <FlatList
                  data={pedido.pedidoProdutos}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                     <View style={styles.cartItem}>
                        <View style={styles.cartItemInfo}>
                           <Text style={styles.cartItemText}>
                              {item.produto.nome} - R$
                              {item.produto.preco.toFixed(2)}
                           </Text>
                           <Text style={styles.cartItemText}>
                              {item.detalhes}
                           </Text>
                        </View>
                        <TouchableOpacity
                           style={styles.removeButton}
                           onPress={() => onRemoveItem(index)}
                        >
                           <MaterialIcons name="close" size={24} color="red" />
                        </TouchableOpacity>
                     </View>
                  )}
                  ListEmptyComponent={
                     <EmptyList
                        iconName="shopping-cart"
                        text="O carrinho está vazio."
                     />
                  }
               />
               <View style={{ marginTop: 16 }}>
                  {pedido.pedidoProdutos &&
                     pedido.pedidoProdutos.length > 1 && (
                        <Text style={styles.modalTitle}>
                           Total produtos: R${' '}
                           {pedido.pedidoProdutos &&
                              pedido.pedidoProdutos
                                 .reduce(
                                    (total, item) => total + item.produto.preco,
                                    0
                                 )
                                 .toFixed(2)}
                        </Text>
                     )}
               </View>
               <Button title="Fechar" onPress={onClose} />
            </View>
         </View>
      </Modal>
   )
}

const styles = StyleSheet.create({
   modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
   },
   modalContent: {
      width: '80%',
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      elevation: 5
   },
   modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16
   },
   cartItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd'
   },
   cartItemInfo: {
      flex: 1
   },
   cartItemText: {
      fontSize: 16
   },
   removeButton: {
      marginLeft: 8
   },
   emptyCartText: {
      textAlign: 'center',
      color: '#666',
      marginTop: 16
   }
})
