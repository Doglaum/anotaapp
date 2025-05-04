import {
   View,
   Text,
   StyleSheet,
   FlatList,
   Modal,
   Button,
   TouchableOpacity,
   ScrollView
} from 'react-native'
import { Order } from '@/database/models/Order'
import { MaterialIcons } from '@expo/vector-icons'
import { EmptyList } from '@/components/EmptyList'

export default function ShoppingCart({
   visible,
   onClose,
   order,
   insertOrderData
}: {
   visible: boolean
   onClose: () => void
   order: Partial<Order>
   insertOrderData: <K extends keyof Order>(campo: K, valor: Order[K]) => void
}) {
   function onRemoveItem(index: number) {
      if (order.orderProducts) {
         const filteredOrderProducts = order.orderProducts.filter(
            (_, i) => i !== index
         )
         insertOrderData('orderProducts', filteredOrderProducts)
      }
   }
   return (
      <Modal
         visible={visible}
         transparent={true}
         animationType="fade"
         onRequestClose={onClose}
      >
         <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
               <Text style={styles.modalTitle}>
                  {order?.client?.name
                     ? `Carrinho de ${order.client.name}`
                     : 'Carrinho'}
               </Text>
               <View style={{ maxHeight: '80%' }}>
                  <FlatList
                     data={order.orderProducts}
                     keyExtractor={(item, index) => index.toString()}
                     renderItem={({ item, index }) => (
                        <View style={styles.cartItem}>
                           <View style={styles.cartItemInfo}>
                              <Text style={styles.cartItemText}>
                                 {item.product.name} - R$
                                 {item.product.price.toFixed(2)}
                              </Text>
                              <Text style={styles.cartItemText}>
                                 {item.details}
                              </Text>
                           </View>
                           <TouchableOpacity
                              style={styles.removeButton}
                              onPress={() => onRemoveItem(index)}
                           >
                              <MaterialIcons
                                 name="close"
                                 size={24}
                                 color="red"
                              />
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
               </View>
               <View style={{ marginTop: 16 }}>
                  {order.orderProducts && order.orderProducts.length > 1 && (
                     <Text style={styles.modalTitle}>
                        Total produtos: R${' ' + order.totalPrice}
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
