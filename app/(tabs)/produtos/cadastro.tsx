import {
   View,
   Text,
   StyleSheet,
   TextInput,
   TouchableOpacity,
   ScrollView
} from 'react-native'
import { useState } from 'react'
import { commonStyles, theme } from '@/theme'
import { Produto } from '@/database/models/Produto'
import { ProdutoService } from '@/services/ProdutoService'
import { useRouter } from 'expo-router'
import CurrencyInput from 'react-native-currency-input'

export default function Cadastro() {
   const router = useRouter()
   const produtoService = new ProdutoService()
   const [produto, setProduto] = useState<Partial<Produto>>({
      nome: '',
      preco: 0.0,
      ingredientes: []
   })

   const handleSubmit = async () => {
      console.log(produto)
      if (!produto.preco) {
         setProduto(prev => ({ ...prev, preco: 0 }))
      }
      await produtoService.criarProduto(produto as Produto)
      router.push('/produtos/lista')
   }

   const handlePrecoChange = (text: number) => {
      setProduto(prev => ({
         ...prev,
         preco: text
      }))
   }

   return (
      <ScrollView style={styles.container}>
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
               placeholder="0"
               keyboardType="decimal-pad"
               inputMode="decimal"
            />
         </View>
         <TouchableOpacity
            style={commonStyles.saveButton}
            onPress={handleSubmit}
         >
            <Text style={commonStyles.saveButtonText}>Salvar</Text>
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
   },
   button: {
      backgroundColor: theme.colors.primary,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16
   },
   buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
   }
})
