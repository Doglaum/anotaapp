import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   ScrollView,
   ActivityIndicator
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { commonStyles, theme } from '@/theme'
import { useRouter } from 'expo-router'
import { useState, useCallback } from 'react'
import { Product } from '@/database/models/Product'
import { ProductService } from '@/services/ProductService'
import { useFocusEffect } from 'expo-router'
import { FormSearchInput, successToast, useConfirmModal } from '@/components/'

export default function Products() {
   const { confirm, Confirm } = useConfirmModal()
   const router = useRouter()
   const [products, setProducts] = useState<Product[]>([])
   const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
   const productService = new ProductService()
   const [loading, setLoading] = useState<boolean>(false)

   useFocusEffect(
      useCallback(() => {
         setLoading(true)
         const loadProducts = async () => {
            try {
               const products = await productService.listAll()
               setProducts(products)
               setFilteredProducts(products)
            } catch (error) {
               console.error('Erro ao carregar produtos:', error)
            } finally {
               setLoading(false)
            }
         }
         loadProducts()
      }, [])
   )

   const handleDelete = async (product: Product) => {
      const result = await confirm(`Deseja remover ${product.name}`)
      if (result) {
         deleteProduct(product)
      }
   }

   const deleteProduct = async (product: Product) => {
      await productService.delete(product.productId)
      const newList = products.filter(p => p.productId !== product.productId)
      setProducts(() => newList)
      setFilteredProducts(() => newList)
      successToast('Produto removido com sucesso!')
   }

   const handleSearch = (text: string) => {
      const searchText = text.toLowerCase().trim()
      const filtered = products.filter(product => {
         const name = product.name?.toLowerCase() || ''
         return name.includes(searchText)
      })
      setFilteredProducts(filtered)
   }

   return (
      <View style={commonStyles.container}>
         <FormSearchInput
            label="Pesquisar produto..."
            onChange={handleSearch}
            rota="(tabs)/configuration/product/register/"
            style={{ marginBottom: 10 }}
         />
         {filteredProducts && !loading ? (
            <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
               {filteredProducts.map((item, index) => (
                  <View key={index} style={commonStyles.listItem}>
                     <View style={{ flex: 1, flexShrink: 1 }}>
                        <Text style={styles.productName}>{item.name}</Text>
                        {item.description ? (
                           <Text
                              style={{ fontWeight: '300' }}
                              ellipsizeMode="tail"
                              numberOfLines={2}
                           >
                              {item.description}
                           </Text>
                        ) : null}
                        <Text style={styles.productPrice}>
                           R$ {item.price.toFixed(2)}
                        </Text>
                     </View>
                     <View style={[styles.productActions, { gap: 20 }]}>
                        <TouchableOpacity
                           onPress={() =>
                              router.push(
                                 `/configuration/product/${item.productId}`
                              )
                           }
                        >
                           <MaterialIcons
                              name="edit"
                              size={24}
                              color={theme.colors.edit}
                           />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(item)}>
                           <MaterialIcons
                              name="delete"
                              size={24}
                              color={theme.colors.delete}
                           />
                        </TouchableOpacity>
                     </View>
                  </View>
               ))}
               {Confirm}
            </ScrollView>
         ) : (
            <View
               style={{
                  flex: 1,
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center'
               }}
            >
               <ActivityIndicator
                  animating={loading}
                  size="large"
                  color={theme.colors.primary}
               />
            </View>
         )}
      </View>
   )
}

const styles = StyleSheet.create({
   productName: {
      fontSize: 16,
      fontWeight: 'bold'
   },
   productPrice: {
      fontSize: 14,
      color: '#666',
      marginTop: 4
   },
   productActions: {
      flexDirection: 'row'
   },
   actionButton: {
      marginLeft: 16
   }
})
