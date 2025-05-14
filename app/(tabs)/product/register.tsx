import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   ScrollView,
   FlatList,
   Alert
} from 'react-native'
import { useEffect, useState } from 'react'
import { commonStyles, theme } from '@/theme'
import { Product } from '@/database/models/Product'
import { ProductService, IngredientService } from '@/services/'
import { useRouter } from 'expo-router'
import { CreateIngredientsModal } from './components/CreateIngredientsModal'
import { Ingredient } from '@/database/models'
import { FormTextInput, FormCurrencyInput } from '@/components/'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { CopyIngredientsModal } from './components/CopyIngredientsModal'
import { successToast } from '../../../src/components/AppToast'

export default function RegisterProduct({
   editProductId
}: {
   editProductId: number
}) {
   const router = useRouter()
   const productService = new ProductService()
   const [product, setProduct] = useState<Partial<Product>>({
      name: '',
      price: 0,
      ingredients: []
   })
   useEffect(() => {
      if (editProductId) {
         const searchProduct = async () => {
            const editProduct = await productService.findById(editProductId)
            setProduct(editProduct || {})
         }
         searchProduct()
      }
   }, [])

   const handleSubmit = async () => {
      if (!product.price) {
         setProduct(prev => ({ ...prev, price: 0 }))
      }
      if (editProductId) {
         await productService.update(editProductId, product)
      } else {
         await productService.save(product as Product)
      }
      router.push('/product/list')
   }

   const changeHandle = (name: string, value: any) => {
      setProduct(prev => ({
         ...prev,
         [name]: value
      }))
   }

   const saveIngredient = (ingredient: Partial<Ingredient>) => {
      setProduct(prev => ({
         ...prev,
         ingredients: [...(prev.ingredients || []), ingredient as Ingredient]
      }))
   }

   const removeIngredient = (removeIngredient: Partial<Ingredient>) => {
      Alert.alert('Atenção!', `Deseja remover ${removeIngredient.name}`, [
         {
            text: 'Sim',
            onPress: () => {
               setProduct(prev => ({
                  ...prev,
                  ingredients: prev.ingredients?.filter(
                     ingredient => ingredient !== removeIngredient
                  )
               }))
               successToast('Ingrediente removido com sucesso!')
            }
         },
         { text: 'Não' }
      ])
   }

   const copyIngredients = (ingredients: Ingredient[]) => {
      setProduct(prev => ({
         ...prev,
         ingredients: [...(prev.ingredients || []), ...ingredients]
      }))
   }

   const removeAllIngredients = () => {
      Alert.alert(
         'Atenção!',
         `Deseja remover todos os ingredientes do produto ?`,
         [
            {
               text: 'Sim',
               onPress: () => {
                  setProduct(prev => ({
                     ...prev,
                     ingredients: []
                  }))
                  successToast('Ingrediente removido com sucesso!')
               }
            },
            { text: 'Não' }
         ]
      )
   }

   return (
      <View style={[commonStyles.container, { gap: 10 }]}>
         <FormTextInput
            name="name"
            label="Nome"
            value={product.name}
            onChange={changeHandle}
         />
         <FormTextInput
            name="description"
            label="Descrição"
            value={product.description}
            onChange={changeHandle}
         />
         <FormCurrencyInput
            name="price"
            label="Preço"
            value={product.price}
            onChange={changeHandle}
         />
         <View
            style={{
               flexDirection: 'row',
               alignItems: 'center',
               padding: 10,
               paddingVertical: 6
            }}
         >
            <View style={{ flex: 1 }}>
               <Text
                  style={{
                     fontSize: 18,
                     fontWeight: 'bold',
                     color: theme.colors.primary
                  }}
               >
                  Ingredientes
               </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
               <TouchableOpacity
                  onPress={() => removeAllIngredients()}
                  style={commonStyles.smallRemoveButton}
               >
                  <MaterialIcons
                     name="playlist-remove"
                     size={20}
                     color={theme.colors.white}
                  ></MaterialIcons>
               </TouchableOpacity>
               <CopyIngredientsModal
                  currentProductId={product.productId || 0}
                  buttonStyle={commonStyles.smallCopyButton}
                  onSelect={copyIngredients}
               />
               <CreateIngredientsModal
                  buttonStyle={commonStyles.smallAddButton}
                  onSave={saveIngredient}
               />
            </View>
         </View>
         <FlatList<Partial<Ingredient>>
            keyExtractor={(item, index) => index.toString()}
            data={product.ingredients}
            renderItem={({ item, index }) => (
               <View style={[commonStyles.listItem]}>
                  <View
                     style={{
                        alignItems: 'center',
                        flexDirection: 'row'
                     }}
                  >
                     <Text
                        style={{
                           fontSize: 16,
                           fontWeight: 'bold'
                        }}
                     >
                        {`${item.name}`}
                     </Text>
                     <Text style={{ fontWeight: 'bold' }}>
                        {`${item.price ? ` - R$${item.price.toFixed(2)}` : ''}`}
                     </Text>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 10 }}>
                     <TouchableOpacity
                        key={index}
                        onPress={() => {
                           removeIngredient(item)
                        }}
                        style={{ flexDirection: 'row' }}
                     >
                        <MaterialIcons
                           name="delete"
                           size={25}
                           color={theme.colors.delete}
                        />
                     </TouchableOpacity>
                  </View>
               </View>
            )}
         />
         <TouchableOpacity
            style={[
               !editProductId
                  ? commonStyles.saveButton
                  : commonStyles.editButton,
               { marginTop: 'auto' }
            ]}
            onPress={handleSubmit}
         >
            <Text style={commonStyles.saveButtonText}>
               {!editProductId ? 'Salvar' : 'Editar'}
            </Text>
         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   formGroup: {
      marginBottom: 16
   },
   selectedStyle: {
      backgroundColor: '#fa0c5b',
      marginRight: 10,
      fontSize: 10,
      borderRadius: 8,
      padding: 6
   }
})
