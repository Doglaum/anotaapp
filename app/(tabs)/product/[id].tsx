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

   const handlePriceChange = (text: number) => {
      setProduct(prev => ({
         ...prev,
         price: text
      }))
   }

   return (
      <ScrollView style={commonStyles.container}>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
               style={styles.input}
               value={product.name}
               onChangeText={text =>
                  setProduct(prev => ({ ...prev, price: Number(text) }))
               }
               placeholder="Digite o nome do produto"
            />
         </View>

         <View style={styles.formGroup}>
            <Text style={styles.label}>Preço</Text>
            <CurrencyInput
               style={styles.input}
               value={product.price || null}
               onChangeValue={handlePriceChange}
               minValue={0}
               delimiter="."
               separator=","
               placeholder="Digite o preço"
               keyboardType="decimal-pad"
               inputMode="decimal"
            />
         </View>

         <TouchableOpacity
            style={commonStyles.editButton}
            onPress={handleSubmit}
         >
            <Text style={commonStyles.editButtonText}>Editar</Text>
         </TouchableOpacity>
      </ScrollView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff'
   },
   formGroup: {
      marginBottom: 16
   },
   label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
      color: theme.colors.text
   },
   input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: '#fff'
   },
   textArea: {
      height: 100,
      textAlignVertical: 'top'
   }
})
