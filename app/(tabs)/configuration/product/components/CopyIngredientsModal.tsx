import {
   Text,
   TouchableOpacity,
   View,
   ViewStyle,
   StyleProp,
   FlatList,
   Modal,
   StyleSheet,
   Button,
   ScrollView
} from 'react-native'
import { commonStyles, theme } from '@/theme'
import { Ingredient, Product } from '@/database/models'
import { useEffect, useState } from 'react'
import { FormSearchInput, FormTextInput } from '@/components'
import { EmptyList, successToast, OverlayerModal } from '@/components'
import { ProductService } from '@/services'
import { MaterialIcons } from '@expo/vector-icons'

const CopyIngredientsModal = ({
   onClose,
   buttonStyle,
   onSelect,
   currentProductId
}: {
   onClose?: () => void
   buttonStyle?: StyleProp<ViewStyle>
   onSelect: (ingredient: Ingredient[]) => void
   currentProductId: number
}) => {
   const productService = new ProductService()
   const [productList, setProductList] = useState<Product[]>([])
   const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
   const [confirmModalVisible, setConfirmModalVisible] = useState(false)
   const [selectProduct, setSelectedProduct] = useState<Product>({} as Product)
   const [overlayModalVisible, setOverlayModalVisible] =
      useState<boolean>(false)

   const listAllProduct = async () => {
      const products = await productService.listAllWithIngredients(
         currentProductId
      )
      setProductList(products)
      setFilteredProducts(products)
   }

   useEffect(() => {
      if (overlayModalVisible) {
         listAllProduct()
      }
   }, [overlayModalVisible])

   const filterList = (text: string) => {
      const searchText = text.toLowerCase().trim()
      const filtered = productList.filter(product => {
         const name = product.name?.toLowerCase() || ''
         return name.includes(searchText)
      })
      setFilteredProducts(filtered)
   }

   const copyIngredients = (ingredients: Ingredient[]) => {
      successToast('Ingredientes copiados!')
      const ingredientsWithoutId = ingredients.map(
         item =>
            ({
               name: item.name,
               price: item.price
            } as Ingredient)
      )
      onSelect(ingredientsWithoutId)
   }

   return (
      <View>
         <OverlayerModal
            overlayModalVisible={overlayModalVisible}
            onClose={() => {
               setOverlayModalVisible(false)
            }}
            title="Copiar Ingredientes"
         >
            <View style={commonStyles.container}>
               <View style={{ marginBottom: 10 }}>
                  <FormSearchInput
                     onChange={filterList}
                     label="Pesquisar por nome"
                  />
               </View>
               <ScrollView keyboardShouldPersistTaps="handled">
                  {filteredProducts &&
                     filteredProducts.map((item, index) => (
                        <TouchableOpacity
                           key={index}
                           onPress={() => {
                              setSelectedProduct(item)
                              setConfirmModalVisible(true)
                           }}
                           style={commonStyles.listItem}
                        >
                           <View
                              style={{
                                 flex: 1,
                                 flexDirection: 'row',
                                 gap: 10
                              }}
                           >
                              <Text>{item.name}</Text>
                              <Text>
                                 {item.price
                                    ? `R$${item.price.toFixed(2)}`
                                    : ''}
                              </Text>
                           </View>
                           <MaterialIcons name="copy-all" size={20} />
                        </TouchableOpacity>
                     ))}
               </ScrollView>
            </View>
            <Modal
               visible={confirmModalVisible}
               transparent={true}
               animationType="fade"
               onRequestClose={() => setConfirmModalVisible(false)}
            >
               <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                     <Text
                        style={{
                           fontWeight: 'bold',
                           fontSize: 16,
                           textAlign: 'center',
                           marginBottom: 20
                        }}
                     >{`Deseja copiar os ingredientes do produto ${selectProduct.name}?`}</Text>
                     <View style={styles.modalActions}>
                        <Button
                           color={theme.colors.delete}
                           title="Cancelar"
                           onPress={() => setConfirmModalVisible(false)}
                        />
                        <Button
                           color={theme.colors.primary}
                           title="Confirmar"
                           onPress={() => {
                              copyIngredients(selectProduct.ingredients)
                              setConfirmModalVisible(false)
                           }}
                        />
                     </View>
                  </View>
               </View>
            </Modal>
         </OverlayerModal>
         <TouchableOpacity
            style={[buttonStyle]}
            onPress={() => setOverlayModalVisible(true)}
         >
            <MaterialIcons name="content-copy" size={18} color="#fff" />
         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   modalActions: {
      flexDirection: 'row',
      justifyContent: 'space-between'
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
   }
})

export default CopyIngredientsModal
