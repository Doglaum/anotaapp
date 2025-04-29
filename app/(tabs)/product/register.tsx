import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   ScrollView
} from 'react-native'
import { useEffect, useState } from 'react'
import { commonStyles, theme } from '@/theme'
import { Product } from '@/database/models/Product'
import { ProductService, IngredientService } from '@/services/'
import { useRouter } from 'expo-router'
import { CreateIngredientsModal } from './components/CreateIngredientsModal'
import { Ingredient } from '@/database/models'
import { FormTextInput, FormCurrencyInput } from '@/components/'
import { MaterialIcons } from '@expo/vector-icons'
import { CopyIngredientsModal } from './components/CopyIngredientsModal'

export default function RegisterProduct({
   editProductId
}: {
   editProductId: number
}) {
   const router = useRouter()
   const productService = new ProductService()
   const [product, setProduct] = useState<Partial<Product>>({
      name: '',
      price: 0.0,
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
      await productService.save(product as Product)
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
      setProduct(prev => ({
         ...prev,
         ingredients: prev.ingredients?.filter(
            ingredient => ingredient !== removeIngredient
         )
      }))
   }

   const copyIngredients = (ingredients: Ingredient[]) => {
      setProduct(prev => ({
         ...prev,
         ingredients: [...(prev.ingredients || []), ...ingredients]
      }))
      console.log(ingredients)
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
         <ScrollView
            style={[
               styles.formGroup,
               {
                  backgroundColor: 'white',
                  borderWidth: 0.8,
                  borderRadius: 8,
                  borderColor: theme.colors.primary,
                  flex: 1,
                  overflow: 'scroll'
               }
            ]}
         >
            <View
               style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                  padding: 10
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
               <View style={{ flexDirection: 'row', gap: 5 }}>
                  <CopyIngredientsModal
                     buttonStyle={commonStyles.circleCopyButton}
                     onSelect={copyIngredients}
                  />
                  <CreateIngredientsModal
                     buttonStyle={commonStyles.circleAddButton}
                     onSave={saveIngredient}
                  />
               </View>
            </View>
            <View
               style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 4
               }}
            >
               {product.ingredients?.map((ingredient, index) => (
                  <TouchableOpacity
                     key={index}
                     style={styles.selectedStyle}
                     onPress={() => {
                        removeIngredient(ingredient)
                     }}
                  >
                     <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                     >
                        <View
                           style={{
                              alignItems: 'center',
                              flexDirection: 'column'
                           }}
                        >
                           <Text
                              style={{
                                 fontSize: 12,
                                 color: theme.colors.white
                              }}
                           >
                              {`${ingredient.name}`}

                              <Text>
                                 {`${
                                    ingredient.price
                                       ? ` R$:${ingredient.price.toFixed(2)}`
                                       : ''
                                 }`}
                              </Text>
                           </Text>
                        </View>
                        <MaterialIcons
                           name="delete"
                           size={14}
                           color={theme.colors.white}
                        />
                     </View>
                  </TouchableOpacity>
               ))}
            </View>
         </ScrollView>
         <TouchableOpacity
            style={[commonStyles.saveButton, { marginTop: 'auto' }]}
            onPress={handleSubmit}
         >
            <Text style={commonStyles.saveButtonText}>Salvar</Text>
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
