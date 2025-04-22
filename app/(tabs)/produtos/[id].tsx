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
import { Produto } from '@/database/models/Produto'
import { ProdutoService } from '@/services/ProdutoService'
import { useLocalSearchParams, useRouter } from 'expo-router'
import CurrencyInput from 'react-native-currency-input'

export default function Editar() {
   const [produto, setProduto] = useState<Partial<Produto>>({
      nome: '',
      preco: 0.0,
      ingredientes: []
   })
   const router = useRouter()
   const produtoService = new ProdutoService()
   const { id } = useLocalSearchParams<{ id: string }>()
   const numberId = Number(id)
   useEffect(() => {
      const loadProduto = async () => {
         try {
            const produto = await produtoService.buscarProduto(numberId)
            if (produto) {
               setProduto(produto)
            } else {
               console.error('Produto não encontrado.')
               router.push('/produtos') // Redireciona caso o produto não seja encontrado
            }
         } catch (error) {
            console.error('Erro ao carregar produto:', error)
         }
      }

      loadProduto()
   }, [numberId])

   const handleSubmit = async () => {
      if (!produto.preco) {
         setProduto(prev => ({ ...prev, preco: 0 }))
      }
      await produtoService.atualizarProduto(numberId, produto)
      router.push('/produtos')
   }

   const handlePrecoChange = (text: number) => {
      setProduto(prev => ({
         ...prev,
         preco: text
      }))
   }

   return (
      <ScrollView style={commonStyles.container}>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
               style={styles.input}
               value={produto.nome}
               onChangeText={text =>
                  setProduto(prev => ({ ...prev, nome: text }))
               }
               placeholder="Digite o nome do produto"
            />
         </View>

         <View style={styles.formGroup}>
            <Text style={styles.label}>Preço</Text>
            <CurrencyInput
               style={styles.input}
               value={produto.preco || null}
               onChangeValue={handlePrecoChange}
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
