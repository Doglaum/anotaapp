import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { commonStyles } from '@/theme'
import { Product } from '@/database/models/Product'
import { ProductService, IngredientService } from '@/services/'
import { useRouter } from 'expo-router'
import { MultiSelectInput } from '@/components/MultiSelectInput'
import { CreateIngredientsModal } from '@/components/CreateIngredientsModal'
import { Ingredient } from '@/database/models'
import { FormTextInput, FormCurrencyInput } from '@/components/'

export default function RegisterProduct() {
   const router = useRouter()
   const productService = new ProductService()
   const ingredientService = new IngredientService()
   const [product, setProduct] = useState<Partial<Product>>({
      name: '',
      price: 0.0,
      ingredients: []
   })
   const [listIngredients, setListIngredients] = useState<Ingredient[]>([])
   const insertIngredients = (listIngredients: Ingredient[]) => {
      setListIngredients(prev => [...prev, ...listIngredients])
   }
   const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])

   const loadIngredients = async () => {
      const ingredients = await ingredientService.listAll()
      console.log(ingredients)
      setListIngredients(ingredients)
   }

   useEffect(() => {
      loadIngredients()
   }, [])

   const handleSubmit = async () => {
      if (!product.price) {
         setProduct(prev => ({ ...prev, price: 0 }))
      }
      await productService.save(product as Product)
      router.push('/product/list')
   }

   const handlePriceChange = (price: number) => {
      setProduct(prev => ({
         ...prev,
         price: price
      }))
   }

   const changeHandle = (name: string, value: any) => {
      setProduct(prev => ({
         ...prev,
         [name]: value
      }))
   }

   return (
      <View style={commonStyles.container}>
         <FormTextInput
            name="name"
            label="Nome"
            value={product.name}
            onChange={changeHandle}
         />
         <FormCurrencyInput
            name="price"
            label="Preço"
            value={product.price}
            onChange={changeHandle}
         />
         <Text>{JSON.stringify(product)}</Text>
         <View style={styles.formGroup}>
            <View style={[commonStyles.searchContainer]}>
               <MultiSelectInput
                  value={selectedIngredients}
                  key="id"
                  data={listIngredients}
                  labelField="name"
                  setIngredients={setSelectedIngredients}
                  placeholder="Selecione os ingredientes"
                  valueField="id"
               />
               <CreateIngredientsModal onClose={loadIngredients} />
            </View>
         </View>
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
   }
})
