import {
   View,
   Text,
   StyleSheet,
   FlatList,
   TouchableOpacity,
   TextInput
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { commonStyles, theme } from '@/theme'
import { useRouter } from 'expo-router'
import { useState, useEffect, useCallback } from 'react'
import { Product } from '@/database/models/Product'
import { ProductService } from '@/services/ProductService'
import { useFocusEffect } from 'expo-router'
import { EmptyList } from '@/components/EmptyList'

export default function Products() {
   const router = useRouter()
   const [products, setProducts] = useState<Product[]>([])
   const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
   const productService = new ProductService()

   useFocusEffect(
      useCallback(() => {
         const loadProducts = async () => {
            try {
               const products = await productService.listAll()
               setProducts(products)
               setFilteredProducts(products)
            } catch (error) {
               console.error('Erro ao carregar produtos:', error)
            }
         }
         loadProducts()
         return () => {
            console.log('Saindo da aba Pedidos')
         }
      }, [])
   )

   const handleDelete = async (id: number) => {
      await productService.delete(id)
      const newList = products.filter(p => p.id !== id)
      setProducts(() => newList)
      setFilteredProducts(() => newList)
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
         <View style={commonStyles.searchContainer}>
            <TextInput
               style={commonStyles.input}
               placeholder="Pesquisar produto"
               onChangeText={handleSearch}
            />
            <TouchableOpacity
               style={commonStyles.addButton}
               onPress={() => router.push('/product/register')}
            >
               <MaterialIcons name="add" size={24} color="#fff" />
            </TouchableOpacity>
         </View>
         <FlatList<Product>
            data={filteredProducts}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
               <View style={commonStyles.listItem}>
                  <View>
                     <Text style={styles.productName}>{item.name}</Text>
                     <Text style={styles.productPrice}>
                        R$ {item.price.toFixed(2)}
                     </Text>
                  </View>
                  <View style={styles.productActions}>
                     <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => router.push(`/product/${item.id}`)}
                     >
                        <MaterialIcons
                           name="edit"
                           size={24}
                           color={theme.colors.edit}
                        />
                     </TouchableOpacity>
                     <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleDelete(item.id)}
                     >
                        <MaterialIcons
                           name="delete"
                           size={24}
                           color={theme.colors.delete}
                        />
                     </TouchableOpacity>
                  </View>
               </View>
            )}
            ListEmptyComponent={
               <EmptyList
                  iconName="restaurant"
                  text="Nenhum produto cadastrado"
               />
            }
         />
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
