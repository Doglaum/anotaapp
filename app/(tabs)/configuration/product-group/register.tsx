import {
   View,
   Text,
   ScrollView,
   TouchableOpacity,
   StyleSheet,
   ActivityIndicator
} from 'react-native'
import { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { commonStyles, theme } from '@/theme'
import { FormTextInput } from '@/components'
import { Product, ProductGroup } from '@/database/models'
import { ProductService } from '@/services'
import { ProductGroupService } from '@/services/ProductGroupService'

const RegisterProductGroup = ({
   editProductGroupId
}: {
   editProductGroupId: number
}) => {
   const productService = new ProductService()
   const productGroupService = new ProductGroupService()
   const [loading, setLoading] = useState<boolean>(false)
   const [productsList, setProductList] = useState<Product[]>([])
   const [group, setGroup] = useState<Partial<ProductGroup>>(
      {} as Partial<ProductGroup>
   )

   useEffect(() => {
      if (editProductGroupId) {
         console.log(editProductGroupId)
         const searchProduct = async () => {
            setLoading(true)
            const editProductGroup = await productGroupService.findById(
               editProductGroupId
            )
            console.log('editProduct', editProductGroup)
            setGroup(editProductGroup || {})
         }
         searchProduct()
      }
      const getProducts = async () => {
         setLoading(true)
         const list = await productService.listAll()
         setProductList(list)
         setLoading(false)
      }
      getProducts()
   }, [])

   const handleChange = (name: string, text: string) => {
      setGroup(prev => ({
         ...prev,
         [name]: text
      }))
   }

   const toggleProductInGroup = (product: Product) => {
      setGroup(prev => {
         const exists = prev.products?.some(
            p => p.productId === product.productId
         )
         if (exists) {
            return {
               ...prev,
               products: prev.products?.filter(
                  p => p.productId !== product.productId
               )
            }
         } else {
            return {
               ...prev,
               products: [...(prev.products || []), product]
            }
         }
      })
   }

   const handleSubmit = async () => {
      console.log(group)
      setLoading(true)
      try {
         await productGroupService.save(group)
         router.push('/configuration/product-group')
      } catch (error) {
         console.log(error)
      } finally {
         setLoading(false)
      }
   }
   return (
      <View style={commonStyles.container}>
         <FormTextInput
            label="Nome do grupo"
            name="name"
            onChange={handleChange}
            value={group.name}
            style={{ marginBottom: 10 }}
         />
         {productsList && !loading ? (
            <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
               {productsList.map((item, index) => {
                  const isSelected = group.products?.find(
                     product => product.productId == item.productId
                  )
                  const alreadyHaveGroup = item.productGroup
                  return (
                     <TouchableOpacity
                        onPress={() => toggleProductInGroup(item)}
                        key={index}
                        style={[
                           commonStyles.listItem,
                           alreadyHaveGroup && {
                              backgroundColor: theme.colors.delete
                           },
                           isSelected && {
                              backgroundColor: theme.colors.primary
                           }
                        ]}
                     >
                        <View style={{ flex: 1, flexShrink: 1 }}>
                           <Text
                              style={[
                                 styles.productName,
                                 (isSelected || alreadyHaveGroup) && {
                                    color: theme.colors.white
                                 }
                              ]}
                           >
                              {item.name}
                           </Text>
                           {item.description ? (
                              <Text
                                 style={[
                                    { fontWeight: '300' },
                                    (isSelected || alreadyHaveGroup) && {
                                       color: theme.colors.white
                                    }
                                 ]}
                                 ellipsizeMode="tail"
                                 numberOfLines={1}
                              >
                                 {item.description}
                              </Text>
                           ) : null}
                           <Text
                              style={[
                                 styles.productPrice,
                                 (isSelected || alreadyHaveGroup) && {
                                    color: theme.colors.white
                                 }
                              ]}
                           >
                              R$ {item.price.toFixed(2)}
                           </Text>
                        </View>
                     </TouchableOpacity>
                  )
               })}
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
         <TouchableOpacity
            style={[
               !false ? commonStyles.saveButton : commonStyles.editButton,
               { marginTop: 10 }
            ]}
            onPress={handleSubmit}
         >
            <Text style={commonStyles.saveButtonText}>
               {!false ? 'Salvar' : 'Editar'}
            </Text>
         </TouchableOpacity>
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

export default RegisterProductGroup
