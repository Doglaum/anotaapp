import {
   View,
   Text,
   StyleSheet,
   FlatList,
   TouchableOpacity,
   ScrollView
} from 'react-native'
import React, { useState } from 'react'
import { OverlayerModal } from '@/components/'
import { FormTextInput } from '@/components'
import { Ingredient, OrderProduct, Product } from '@/database/models'
import { commonStyles, theme } from '@/theme'
import { AntDesign } from '@expo/vector-icons'

const CreateOrderProduct = ({
   product,
   modalVisible,
   onClose,
   save
}: {
   modalVisible: boolean
   onClose: () => void
   product: Product
   save: (ingredients: Ingredient[], details: string) => void
}) => {
   const [details, setDetails] = useState('')
   const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
      []
   )

   const handleChange = (name: string, text: string) => {
      setDetails(text)
   }

   const getIngredientCount = (ingredientId: number) => {
      return selectedIngredients.reduce((count, ingredient) => {
         return ingredient.ingredientId === ingredientId ? count + 1 : count
      }, 0)
   }

   const removeIngredient = (removedItem: Ingredient) => {
      const index = selectedIngredients.findIndex(
         item => item.ingredientId === removedItem.ingredientId
      )
      if (index !== -1) {
         const items = [...selectedIngredients]
         items.splice(index, 1)
         setSelectedIngredients(() => items)
      }
   }

   const addIngredient = (item: Ingredient) => {
      setSelectedIngredients(prev => [...prev, item])
   }
   return (
      <OverlayerModal
         title="Produto"
         overlayModalVisible={modalVisible}
         onClose={() => {
            setDetails('')
            setSelectedIngredients([])
            onClose()
         }}
      >
         <View style={commonStyles.container}>
            <FormTextInput
               label="Detalhes"
               name="details"
               value={details}
               onChange={handleChange}
               style={{ marginBottom: 10 }}
            />
            <ScrollView keyboardShouldPersistTaps="handled">
               {product.ingredients &&
                  product.ingredients.map((item, index) => {
                     const count = getIngredientCount(item.ingredientId)

                     return (
                        <View key={index} style={[commonStyles.listItem]}>
                           <View style={{ flexDirection: 'row' }}>
                              <Text>{item.name}</Text>
                              {item.price ? (
                                 <Text>{` - R$${item.price.toFixed(2)}`}</Text>
                              ) : null}
                           </View>
                           <View
                              style={{
                                 flexDirection: 'row',
                                 alignItems: 'center',
                                 gap: 10
                              }}
                           >
                              <TouchableOpacity
                                 onPress={() => {
                                    removeIngredient(item)
                                 }}
                              >
                                 <AntDesign
                                    name="minussquare"
                                    size={25}
                                    color={theme.colors.primary}
                                 ></AntDesign>
                              </TouchableOpacity>
                              <Text
                                 style={{ fontWeight: 'bold', fontSize: 17 }}
                              >
                                 {count}
                              </Text>
                              <TouchableOpacity
                                 onPress={() => {
                                    addIngredient(item)
                                 }}
                              >
                                 <AntDesign
                                    name="plussquare"
                                    size={25}
                                    color={theme.colors.primary}
                                 ></AntDesign>
                              </TouchableOpacity>
                           </View>
                        </View>
                     )
                  })}
            </ScrollView>
            <TouchableOpacity
               style={[commonStyles.addButton]}
               onPress={() => {
                  save(selectedIngredients, details)
                  setDetails('')
                  setSelectedIngredients([])
               }}
            >
               <Text style={commonStyles.addButtonText}>Salvar</Text>
            </TouchableOpacity>
         </View>
      </OverlayerModal>
   )
}

const styles = StyleSheet.create({})

export default CreateOrderProduct
