import { FormSearchInput, useConfirmModal } from '@/components'
import { ProductGroup } from '@/database/models'
import { ProductGroupService } from '@/services/ProductGroupService'
import { commonStyles, theme } from '@/theme'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import {
   ActivityIndicator,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default function TabLayout() {
   const { confirm, Confirm } = useConfirmModal()
   const productGroupService = new ProductGroupService()
   const [productGroupList, setProductGroupList] = useState<ProductGroup[]>([])
   const [filteredProductGroupList, setFilteredProductGroupList] = useState<
      ProductGroup[]
   >([])
   const [loading, setLoading] = useState<boolean>(false)

   useEffect(() => {
      const loadProductGroup = async () => {
         setLoading(true)
         const list = await productGroupService.listAll()
         setFilteredProductGroupList(list)
         setProductGroupList(list)
         setLoading(false)
      }
      loadProductGroup()
   }, [])

   const handleSearch = (text: string) => {
      const searchText = text.toLowerCase().trim()
      const filtered = productGroupList.filter(group => {
         const name = group.name?.toLowerCase() || ''
         return name.includes(searchText)
      })
      setFilteredProductGroupList(filtered)
   }

   const handleDelete = async (productGroup: ProductGroup) => {
      const result = await confirm(
         `Deseja remover o grupo de produtos ${productGroup.name}?`
      )
      if (result) {
         deleteProduct(productGroup)
      }
   }

   const deleteProduct = async (productGroup: ProductGroup) => {
      const newList = await productGroupService.delete(
         productGroup.productGroupId
      )
      setProductGroupList(() => newList)
      setFilteredProductGroupList(() => newList)
   }

   return (
      <View style={commonStyles.container}>
         <FormSearchInput
            style={{ marginBottom: 10 }}
            onChange={handleSearch}
            rota="(tabs)/configuration/product-group/register"
         />
         {filteredProductGroupList && !loading ? (
            <ScrollView keyboardShouldPersistTaps="handled">
               {filteredProductGroupList.map((item, index) => (
                  <View key={index} style={commonStyles.listItem}>
                     <View style={{ flex: 1, flexShrink: 1 }}>
                        <Text style={styles.productName}>{item.name}</Text>
                     </View>
                     <View style={[styles.productActions, { gap: 20 }]}>
                        <TouchableOpacity
                           onPress={() =>
                              router.push(
                                 `/configuration/product-group/${item.productGroupId}`
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
