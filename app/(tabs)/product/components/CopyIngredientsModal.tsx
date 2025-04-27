import {
   Text,
   TouchableOpacity,
   View,
   ViewStyle,
   StyleProp,
   TextInput,
   FlatList
} from 'react-native'
import { commonStyles, theme } from '@/theme'
import { OverlayerModal } from '@/components/OverlayModal'
import { Ingredient, Product } from '@/database/models'
import { useEffect, useState } from 'react'
import { FormSearchInput } from '@/components/form-inputs'
import { EmptyList } from '@/components'
import { ProductService } from '@/services'

export const CopyIngredientsModal = ({
   onClose,
   buttonStyle,
   onSelect
}: {
   onClose?: () => void
   buttonStyle?: StyleProp<ViewStyle>
   onSelect: (ingredient: Ingredient[]) => void
}) => {
   const productService = new ProductService()
   const [productList, setProductList] = useState<Product[]>([])
   const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
   useEffect(() => {
      const listAllProduct = async () => {
         const products = await productService.listAllWithIngredients()
         setProductList(products)
         setFilteredProducts(products)
      }
      listAllProduct()
   }, [])

   const filterList = (text: string) => {
      const searchText = text.toLowerCase().trim()
      const filtered = productList.filter(product => {
         const name = product.name?.toLowerCase() || ''
         return name.includes(searchText)
      })
      setFilteredProducts(filtered)
   }

   const copyIngredients = (ingredients: Ingredient[]) => {
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
      <OverlayerModal
         iconName="content-copy"
         buttonStyle={buttonStyle}
         title="Cadastrar Ingredientes"
      >
         <View style={commonStyles.container}>
            <View style={{ marginBottom: 10, gap: 20 }}>
               <FormSearchInput
                  onChange={filterList}
                  label="Pesquisar por nome"
               />
               <FlatList<Product>
                  keyExtractor={item => item.id.toString()}
                  data={filteredProducts}
                  renderItem={({ item }) => (
                     <TouchableOpacity
                        onPress={() => copyIngredients(item.ingredients)}
                        style={commonStyles.listItem}
                     >
                        <Text>{item.name}</Text>
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
      </OverlayerModal>
   )
}
