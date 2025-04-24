import {
   ScrollView,
   Text,
   TouchableOpacity,
   View,
   StyleSheet,
   TextInput,
   FlatList
} from 'react-native'
import { commonStyles } from '@/theme'
import { OverlayerModal } from './OverlayModal'
import { Ingredient } from '@/database/models'
import { useEffect, useState } from 'react'
import CurrencyInput from 'react-native-currency-input'
import { EmptyList } from './EmptyList'
import { IngredientService } from '@/services/IngredientService'

type CreateIngredientsModalProps = {
   insertIngredients: (listIngredients: Ingredient[]) => void
}

export const CreateIngredientsModal = ({
   insertIngredients
}: CreateIngredientsModalProps) => {
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

   useEffect(() => {
      insertIngredients(listIngredients)
   }, [listIngredients])

   return (
      <OverlayerModal title="Cadastrar Ingredientes">
         <View style={[commonStyles.container, { flex: 0 }]}>
            <ScrollView>
               <View style={styles.formGroup}>
                  <Text style={commonStyles.title}>Nome</Text>
                  <TextInput
                     style={commonStyles.input}
                     value={ingredient.name}
                     onChangeText={text =>
                        setIngredient(prev => ({ ...prev, name: text }))
                     }
                     placeholder="Digite o nome do produto"
                  />
               </View>
               <View style={styles.formGroup}>
                  <Text style={commonStyles.title}>Preço</Text>
                  <CurrencyInput
                     style={commonStyles.input}
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
            </ScrollView>
            <FlatList<Ingredient>
               data={listIngredients}
               horizontal
               keyExtractor={item => item.id.toString()}
               renderItem={({ item }) => (
                  <View style={commonStyles.selectedStyle}>
                     <Text>{item.name}</Text>
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
         <TouchableOpacity
            style={[commonStyles.saveButton, { marginTop: 'auto' }]}
            onPress={saveIngredient}
         >
            <Text style={commonStyles.saveButtonText}>Salvar</Text>
         </TouchableOpacity>
      </OverlayerModal>
   )
}

const styles = StyleSheet.create({
   formGroup: {
      marginBottom: 16
   }
})
