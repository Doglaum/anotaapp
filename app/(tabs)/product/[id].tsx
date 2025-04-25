import {
   View,
   Text,
   StyleSheet,
   TextInput,
   TouchableOpacity,
   ScrollView
} from 'react-native'
import { useEffect, useState } from 'react'
import { theme, commonStyles } from '@/theme'
import { Product } from '@/database/models/Product'
import { ProductService } from '@/services/ProductService'
import { useLocalSearchParams, useRouter } from 'expo-router'
import CurrencyInput from 'react-native-currency-input'
import { FormCurrencyInput, FormTextInput } from '@/components'

export default function Editar() {
   const [product, setProduct] = useState<Partial<Product>>({
      name: '',
      price: 0.0,
      ingredients: []
   })
   const router = useRouter()
   const productService = new ProductService()
   const { id } = useLocalSearchParams<{ id: string }>()
   const numberId = Number(id)
   useEffect(() => {
      const loadProduct = async () => {
         try {
            const product = await productService.findById(numberId)
            if (product) {
               setProduct(product)
            } else {
               console.error('Produto não encontrado.')
               router.push('/product') // Redireciona caso o produto não seja encontrado
            }
         } catch (error) {
            console.error('Erro ao carregar produto:', error)
         }
      }
      loadProduct()
   }, [numberId])

   const handleSubmit = async () => {
      if (!product.price) {
         setProduct(prev => ({ ...prev, price: 0 }))
      }
      await productService.update(numberId, product)
      router.push('/product')
   }

   const handleChange = (name: string, value: any) => {
      setProduct(prev => ({
         ...prev,
         [name]: value
      }))
   }

   return (
      <View style={commonStyles.container}>
         <FormTextInput
            label="Nome"
            name="name"
            onChange={handleChange}
            value={product.name}
         />
         <FormCurrencyInput
            label="Preço"
            name="price"
            onChange={handleChange}
            value={product.price}
         />
         <TouchableOpacity
            style={commonStyles.editButton}
            onPress={handleSubmit}
         >
            <Text style={commonStyles.editButtonText}>Editar</Text>
         </TouchableOpacity>
      </View>
   )
}
