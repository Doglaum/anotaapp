import {
   ScrollView,
   Text,
   TouchableOpacity,
   View,
   StyleSheet,
   TextInput,
   FlatList
} from 'react-native'
import { commonStyles, theme } from '@/theme'
import { OverlayerModal } from './OverlayModal'
import { Ingredient } from '@/database/models'
import { useState } from 'react'
import CurrencyInput from 'react-native-currency-input'
import { IngredientService } from '@/services/IngredientService'
import { MaterialIcons } from '@expo/vector-icons'

export const CreateIngredientsModal = ({
   onClose
}: {
   onClose?: () => void
}) => {
   const ingredientService = new IngredientService()
   const [ingredient, setIngredient] = useState<Partial<Ingredient>>({
      name: '',
      price: 0.0
   })
   const [listIngredients, setListIngredients] = useState<Ingredient[]>([])

   const saveIngredient = async () => {
      const newIngredient = await ingredientService.save(ingredient)
      setListIngredients(prev => [...prev, newIngredient])
      console.log(ingredient)
   }

   const handleDelete = async (id: number) => {
      await ingredientService.delete(id)
      const newList = listIngredients.filter(p => p.id !== id)
      setListIngredients(() => newList)
   }

   return (
      <OverlayerModal title="Cadastrar Ingredientes" onClose={onClose}>
         <View style={[commonStyles.container]}>
            {/* <ScrollView > */}
            <View style={{ marginBottom: 10 }}>
               <View style={commonStyles.formGroup}>
                  <Text style={commonStyles.formLabel}>Nome:</Text>
                  <TextInput
                     style={commonStyles.formInput}
                     value={ingredient.name}
                     onChangeText={text =>
                        setIngredient(prev => ({ ...prev, name: text }))
                     }
                  />
               </View>
               <View style={commonStyles.formGroup}>
                  <Text style={commonStyles.formLabel}>Preço:</Text>
                  <CurrencyInput
                     style={commonStyles.formInput}
                     value={ingredient.price || null}
                     onChangeValue={text =>
                        setIngredient(prev => ({
                           ...prev,
                           price: Number(text?.toFixed(2))
                        }))
                     }
                     minValue={0}
                     delimiter="."
                     separator=","
                     placeholder="0"
                     keyboardType="decimal-pad"
                     inputMode="decimal"
                  />
               </View>
               <TouchableOpacity
                  style={commonStyles.saveButton}
                  onPress={saveIngredient}
               >
                  <Text style={commonStyles.saveButtonText}>Salvar</Text>
               </TouchableOpacity>
            </View>
            {/* </ScrollView> */}
            <FlatList<Ingredient>
               data={listIngredients}
               keyExtractor={item => item.id.toString()}
               renderItem={({ item }) => (
                  <View style={[commonStyles.listItem]}>
                     <View
                        style={{
                           alignItems: 'center',
                           flexDirection: 'row'
                        }}
                     >
                        <Text>{item.name}</Text>
                        <Text>{item.price ? ` - R$ ${item.price}` : ''}</Text>
                     </View>
                     <TouchableOpacity onPress={() => handleDelete(item.id)}>
                        <MaterialIcons
                           name="delete"
                           size={24}
                           color={theme.colors.delete}
                        />
                     </TouchableOpacity>
                  </View>
               )}
               ListEmptyComponent={<View></View>}
            />
         </View>
      </OverlayerModal>
   )
}

const styles = StyleSheet.create({})
