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
import { commonStyles, theme } from '@/theme'
import { useState, useCallback, useEffect } from 'react'
import { Order, Product, OrderProduct, Ingredient } from '@/database/models'
import { ProductService } from '@/services/ProductService'
import { useFocusEffect } from 'expo-router'
import { EmptyList } from '@/components/EmptyList'
import { FormSearchInput, successToast } from '@/components'
import { MaterialIcons } from '@expo/vector-icons'

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
   const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
      []
   )

   const handleOpenModal = (product: Product) => {
      setSelectedProduct(product)
      setModalVisible(true)
   }

   const handleSave = () => {
      const orderProduct = new OrderProduct()
      orderProduct.details = details
      orderProduct.product = selectedProduct
      orderProduct.unitPrice = selectedProduct.price
      let ingredientsTotalPrice = selectedIngredients.reduce(
         (total, orderProductIngredient) => {
            const price = orderProductIngredient.price
            return total + price
         },
         0
      )
      orderProduct.totalPrice = selectedProduct.price + ingredientsTotalPrice
      orderProduct.selectedIngredients = selectedIngredients
      insertOrderData('orderProducts', [
         ...(order?.orderProducts || []),
         orderProduct
      ])
      resetState()
      successToast(`${selectedProduct.name} adicionado ao carrinho`)
      setModalVisible(false)
   }

   const resetState = () => {
      setSelectedProduct({} as Product)
      setSelectedIngredients([] as Ingredient[])
      setDetails('')
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
            style={{ marginBottom: 10 }}
         />
         <FlatList<Product>
            data={filteredProducts}
            keyExtractor={item => item.productId.toString()}
            renderItem={({ item }) => (
               <TouchableOpacity onPress={() => handleOpenModal(item)}>
                  <View style={commonStyles.listItem}>
                     <View style={styles.productInfo}>
                        <View>
                           <Text style={styles.productName}>{item.name}</Text>
                           <Text style={styles.productPrice}>
                              R$ {item.price.toFixed(2)}
                           </Text>
                        </View>
                        <View
                           style={{
                              backgroundColor: theme.colors.primary,
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 8,
                              borderWidth: 0.2,
                              padding: 5
                           }}
                        >
                           <MaterialIcons
                              name="add-shopping-cart"
                              size={16}
                              color={theme.colors.white}
                           ></MaterialIcons>
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
            animationType="fade"
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
                  <FlatList<Ingredient>
                     data={selectedProduct.ingredients}
                     renderItem={({ item }) => {
                        const isSelected = selectedIngredients.some(
                           item => item.ingredientId === item.ingredientId
                        )
                        let count = 0
                        return (
                           <TouchableOpacity
                              onPress={() => {
                                 count += 1
                                 setSelectedIngredients(prev => [...prev, item])
                              }}
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
                                    style={
                                       isSelected && {
                                          color: theme.colors.white
                                       }
                                    }
                                 >
                                    {' '}
                                    {item.name}
                                 </Text>
                                 <Text
                                    style={
                                       isSelected && {
                                          color: theme.colors.white
                                       }
                                    }
                                 >
                                    {item.price
                                       ? `R$ ${item.price.toFixed(2)}`
                                       : ''}
                                    {count}x
                                 </Text>
                              </View>
                           </TouchableOpacity>
                        )
                     }}
                  />
                  <View style={styles.modalActions}>
                     <Button
                        title="Cancelar"
                        onPress={() => {
                           setModalVisible(false)
                           resetState()
                        }}
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
      fontSize: 14,
      fontWeight: 'bold'
   },
   productPrice: {
      fontSize: 13,
      color: '#535353'
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
