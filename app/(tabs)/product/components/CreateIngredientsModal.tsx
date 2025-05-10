import {
   Text,
   TouchableOpacity,
   View,
   ViewStyle,
   StyleProp,
   TextInput
} from 'react-native'
import { commonStyles, theme } from '@/theme'
import { OverlayerModal } from '@/components/OverlayModal'
import { Ingredient } from '@/database/models'
import { useState } from 'react'
import { FormCurrencyInput, FormTextInput } from '@/components/form-inputs'
import { MaterialIcons } from '@expo/vector-icons'
import { errorToast, successToast } from '@/components'
import { error } from 'console'

export const CreateIngredientsModal = ({
   onClose,
   buttonStyle,
   onSave
}: {
   onClose?: () => void
   buttonStyle?: StyleProp<ViewStyle>
   onSave: (ingredient: Partial<Ingredient>) => void
}) => {
   const [overlayModalVisible, setOverlayModalVisible] =
      useState<boolean>(false)
   const [ingredient, setIngredient] = useState<Partial<Ingredient>>({
      name: '',
      price: 0.0
   })

   const saveIngredient = async () => {
      if (!ingredient.name) {
         errorToast('Nome é obrigatório')
         return
      }
      successToast(`${ingredient.name} cadastrado`)
      onSave(Object.assign(ingredient, {}))
      setIngredient({ name: '', price: 0.0 })
   }

   const changeHandle = (name: string, value: any) => {
      setIngredient(prev => ({
         ...prev,
         [name]: value
      }))
   }

   const handleClose = () => {
      setIngredient({ name: '', price: 0.0 })
   }

   return (
      <View>
         <OverlayerModal
            title="Cadastrar Ingredientes"
            onClose={() => {
               setOverlayModalVisible(false)
               handleClose()
            }}
            overlayModalVisible={overlayModalVisible}
         >
            <View style={commonStyles.container}>
               <View style={{ marginBottom: 10, gap: 20 }}>
                  <FormTextInput
                     label="Nome"
                     name="name"
                     onChange={changeHandle}
                     value={ingredient.name}
                  />
                  <FormCurrencyInput
                     label="Preço"
                     name="price"
                     onChange={changeHandle}
                     value={ingredient.price}
                  />
                  <TouchableOpacity
                     style={[commonStyles.saveButton, { marginTop: 'auto' }]}
                     onPress={saveIngredient}
                  >
                     <Text style={commonStyles.saveButtonText}>Salvar</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </OverlayerModal>
         <TouchableOpacity
            style={[buttonStyle]}
            onPress={() => setOverlayModalVisible(true)}
         >
            <MaterialIcons name="add" size={18} color="#fff" />
         </TouchableOpacity>
      </View>
   )
}
