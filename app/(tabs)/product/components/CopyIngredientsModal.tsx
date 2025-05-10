import {
   Text,
   TouchableOpacity,
   View,
   ViewStyle,
   StyleProp,
   FlatList,
   Modal,
   StyleSheet,
   Button
} from 'react-native'
import { commonStyles, theme } from '@/theme'
import { OverlayerModal } from '@/components/OverlayModal'
import { Ingredient, Product } from '@/database/models'
import { useEffect, useState } from 'react'
import { FormSearchInput, FormTextInput } from '@/components/form-inputs'
import { EmptyList, successToast } from '@/components'
import { ProductService } from '@/services'
import { MaterialIcons } from '@expo/vector-icons'

export const CopyIngredientsModal = ({
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
      console.log('zeca')
      const products = await productService.listAllWithIngredients(
         currentProductId
      )

      console.log(products)
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
               <View style={{ marginBottom: 10, gap: 20 }}>
                  <FormSearchInput
                     onChange={filterList}
                     label="Pesquisar por nome"
                  />
                  <FlatList<Product>
                     keyExtractor={item => item.productId.toString()}
                     data={filteredProducts}
                     renderItem={({ item }) => (
                        <TouchableOpacity
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
                     )}
                     ListEmptyComponent={
                        <EmptyList
                           iconName="restaurant"
                           text="Nenhum produto encontrado"
                        />
                     }
                  />
               </View>
            </View>
            <Modal
               visible={confirmModalVisible}
               transparent={true}
               animationType="slide"
               onRequestClose={() => setConfirmModalVisible(false)}
            >
               <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                     <Text>{`Deseja copiar os ingredientes do produto ${selectProduct.name}?`}</Text>
                     <View style={styles.modalActions}>
                        <Button
                           title="Cancelar"
                           onPress={() => setConfirmModalVisible(false)}
                        />
                        <Button
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
