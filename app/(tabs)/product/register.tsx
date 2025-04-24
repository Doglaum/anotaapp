import {
   View,
   Text,
   StyleSheet,
   TextInput,
   TouchableOpacity,
   ScrollView
} from 'react-native'
import { useState } from 'react'
import { commonStyles } from '@/theme'
import { Product } from '@/database/models/Product'
import { ProductService } from '@/services/ProductService'
import { useRouter } from 'expo-router'
import CurrencyInput from 'react-native-currency-input'
import { MultiSelectInput } from '@/components/MultiSelectInput'
import { MaterialIcons } from '@expo/vector-icons'
import { CreateIngredientsModal } from '@/components/CreateIngredientsModal'
import { Ingredient } from '@/database/models'

export default function RegisterProduct() {
   const router = useRouter()
   const productService = new ProductService()
   const [product, setProduct] = useState<Partial<Product>>({
      name: '',
      price: 0.0,
      ingredients: []
   })
   const [listIngredients, setListIngredients] = useState<Ingredient[]>([])
   const insertIngredients = (listIngredients: Ingredient[]) => {
      setListIngredients(prev => [...prev, ...listIngredients])
   }
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

   return (
      <View style={commonStyles.container}>
         <ScrollView style={commonStyles.container}>
            <View style={styles.formGroup}>
               <Text style={commonStyles.title}>Nome</Text>
               <TextInput
                  style={commonStyles.input}
                  value={product.name}
                  onChangeText={text =>
                     setProduct(prev => ({ ...prev, name: text }))
                  }
                  placeholder="Digite o nome do produto"
               />
            </View>
            <View style={styles.formGroup}>
               <Text style={commonStyles.title}>Preço</Text>
               <CurrencyInput
                  style={commonStyles.input}
                  value={product.price || null}
                  onChangeValue={handlePriceChange}
                  minValue={0}
                  delimiter="."
                  separator=","
                  placeholder="0"
                  keyboardType="decimal-pad"
                  inputMode="decimal"
               />
            </View>
            <View style={styles.formGroup}>
               <Text style={commonStyles.title}>Ingredientes</Text>
               <View style={commonStyles.searchContainer}>
                  <MultiSelectInput
                     data={listIngredients}
                     labelField="name"
                     onChange={insertIngredients}
                     placeholder="Selecione os ingredientes"
                     valueField="id"
                  />
                  <CreateIngredientsModal
                     insertIngredients={insertIngredients}
                  />
               </View>
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
   }
})
