import {
   View,
   Text,
   StyleSheet,
   FlatList,
   TouchableOpacity,
   Modal,
   Button,
   TextInput
} from 'react-native'
import { commonStyles } from '@/theme'
import { useState, useCallback, useEffect } from 'react'
import { Order, Product, OrderProduct } from '@/database/models'
import { ProductService } from '@/services/ProductService'
import { useFocusEffect } from '@react-navigation/native'
import { EmptyList } from '@/components/EmptyList'
import { FormSearchInput } from '@/components'

export const OrdeProductStep = ({
   order,
   insertOrderData
}: {
   order: Partial<Order>
   insertOrderData: <K extends keyof Order>(campo: K, valor: Order[K]) => void
}) => {
   const productService = new ProductService()
   const [products, setProducts] = useState<Product[]>([])
   const [modalVisible, setModalVisible] = useState(false)
   const [details, setDetails] = useState('')
   const [selectedProduct, setSelectedProduct] = useState<Product>(
      {} as Product
   )
   const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
   const [filterText, setFilterText] = useState<string>('')

   const handleOpenModal = (product: Product) => {
      setSelectedProduct(product)
      setModalVisible(true)
   }

   const handleSave = () => {
      const orderProduct = new OrderProduct()
      orderProduct.details = details
      orderProduct.product = selectedProduct
      orderProduct.unitPrice = selectedProduct.price
      insertOrderData('orderProducts', [
         ...(order?.orderProducts || []),
         orderProduct
      ])
      setSelectedProduct({} as Product)
      setDetails('')
      setModalVisible(false)
   }

   useFocusEffect(
      useCallback(() => {
         const loadProdutos = async () => {
            try {
               const products = await productService.listAll()
               setProducts(products)
               setFilteredProducts(products)
            } catch (error) {
               console.error('Erro ao carregar produtos:', error)
            }
         }
         loadProdutos()
         return () => {
            console.log('pedido produto step')
         }
      }, [])
   )

   useEffect(() => {
      const handleSearch = (text: string) => {
         const searchText = text.toLowerCase().trim()
         const filtered = products.filter(product => {
            const name = product.name?.toLowerCase() || ''
            const price = product.price?.toString().toLowerCase() || ''
            return name.includes(searchText) || price.includes(searchText)
         })
         setFilteredProducts(filtered)
      }
      handleSearch(filterText)
   }, [filterText])

   return (
      <View style={commonStyles.container}>
         <FormSearchInput
            onChange={setFilterText}
            label="Nome, preço"
            value={filterText}
         />
         <FlatList<Product>
            data={filteredProducts}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
               <TouchableOpacity onPress={() => handleOpenModal(item)}>
                  <View style={commonStyles.listItem}>
                     <View style={styles.productInfo}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <View>
                           <Text style={styles.productPrice}>
                              R$ {item.price.toFixed(2)}
                           </Text>
                        </View>
                     </View>
                  </View>
               </TouchableOpacity>
            )}
            ListEmptyComponent={
               <EmptyList
                  iconName="restaurant"
                  text="Nenhum produto cadastrado"
               />
            }
         />
         <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
         >
            <View style={styles.modalContainer}>
               <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Adicionar Detalhes</Text>
                  <TextInput
                     style={styles.input}
                     placeholder="Detalhes"
                     onChangeText={setDetails}
                  />
                  <View style={styles.modalActions}>
                     <Button
                        title="Cancelar"
                        onPress={() => setModalVisible(false)}
                     />
                     <Button title="Salvar" onPress={handleSave} />
                  </View>
               </View>
            </View>
         </Modal>
      </View>
   )
}

const styles = StyleSheet.create({
   productInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1
   },
   productName: {
      fontSize: 16,
      fontWeight: 'bold'
   },
   productPrice: {
      fontSize: 14,
      color: '#666',
      marginTop: 4
   },
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
   input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      marginBottom: 16
   },
   modalActions: {
      flexDirection: 'row',
      justifyContent: 'space-between'
   }
})
