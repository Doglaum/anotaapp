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
import { Produto } from '@models/Produto'
import { ProdutoService } from '@/services/ProdutoService'
import { useRouter, Stack } from 'expo-router'

export default function Cadastro() {
   const router = useRouter()
   const produtoService = new ProdutoService()
   const [produto, setProduto] = useState<Partial<Produto>>({
      nome: '',
      preco: 0.0,
      descricao: ''
   })

   const handleSubmit = async () => {
      await produtoService.criarProduto(produto as Produto)
      router.push('/produtos/lista')
   }
   const handleInputChange = (text: string) => {
      console.log(text)
      // Permite apenas números e um ponto decimal
      const formattedText = text.replace(/[^0-9.]/g, '')

      // Garante que não haja mais de um ponto decimal
      if ((formattedText.match(/\./g) || []).length <= 1) {
         setProduto(prev => ({
            ...prev,
            preco: Number.parseFloat(formattedText)
         }))
      }
   }

   return (
      <ScrollView style={styles.container}>
         <Stack.Screen
            options={{
               title: 'Gravar Produto',
               headerStyle: {
                  backgroundColor: theme.colors.primary
               }
            }}
         />
         <View style={styles.formGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
               style={styles.input}
               value={produto.nome}
               onChangeText={text =>
                  setProduto(() => ({ ...produto, nome: text }))
               }
               placeholder="Digite o nome do produto"
            />
         </View>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Preço</Text>
            <TextInput
               style={styles.input}
               value={produto.preco?.toString()}
               onChangeText={handleInputChange}
               placeholder="Digite o preço"
               keyboardType="numeric"
            />
         </View>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
               style={[styles.input, styles.textArea]}
               value={produto.descricao}
               onChangeText={text =>
                  setProduto(() => ({ ...produto, descricao: text }))
               }
               placeholder="Digite a descrição do produto"
               multiline
               numberOfLines={4}
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
