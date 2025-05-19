import {
   View,
   Text,
   StyleSheet,
   FlatList,
   TouchableOpacity,
   Alert
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { commonStyles, theme } from '@/theme'
import { useRouter } from 'expo-router'
import { useState, useCallback } from 'react'
import { Product } from '@/database/models/Product'
import { ProductService } from '@/services/ProductService'
import { useFocusEffect } from 'expo-router'
import { EmptyList } from '@/components/EmptyList'
import { FormSearchInput } from '@/components/'

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

   const handleDelete = async (product: Product) => {
      Alert.alert('Atenção!', `Deseja remover ${product.name}`, [
         {
            text: 'Sim',
            onPress: () => {
               deleteProduct(product)
            }
         },
         { text: 'Não' }
      ])
   }

   const deleteProduct = async (product: Product) => {
      await productService.delete(product.productId)
      const newList = products.filter(p => p.productId !== product.productId)
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
         <FormSearchInput
            label="Pesquisar produto..."
            onChange={handleSearch}
            rota="(tabs)/configuration/product/register/"
            style={{ marginBottom: 10 }}
         />
         <FlatList<Product>
            data={filteredProducts}
            keyExtractor={item => item.productId.toString()}
            renderItem={({ item }) => (
               <View style={commonStyles.listItem}>
                  <View style={{ flex: 1, flexShrink: 1 }}>
                     <Text style={styles.productName}>{item.name}</Text>
                     {item.description ? (
                        <Text
                           style={{ fontWeight: '300' }}
                           ellipsizeMode="tail"
                           numberOfLines={1}
                        >
                           {item.description}
                        </Text>
                     ) : null}
                     <Text style={styles.productPrice}>
                        R$ {item.price.toFixed(2)}
                     </Text>
                  </View>
                  <View></View>
                  <View style={[styles.productActions]}>
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
