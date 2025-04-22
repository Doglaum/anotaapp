import {
   View,
   Text,
   StyleSheet,
   TextInput,
   TouchableOpacity
} from 'react-native'
import { useState } from 'react'
import { theme } from '@/theme'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Endereco } from '@/database/models'

export default function CadastroEndereco() {
   const router = useRouter()
   const { onSave } = useLocalSearchParams()

   const [endereco, setEndereco] = useState<Partial<Endereco>>({
      cidade: '',
      bairro: '',
      rua: '',
      numero: '',
      complemento: ''
   })

   const handleSave = () => {
      router.push({
         pathname: '/clientes/cadastro',
         params: { endereco: JSON.stringify(endereco) }
      })
   }

   return (
      <View style={styles.container}>
         <Text style={styles.label}>Rua</Text>
         <TextInput
            style={styles.input}
            value={endereco.rua}
            onChangeText={text => setEndereco({ ...endereco, rua: text })}
            placeholder="Digite a rua"
         />
         <Text style={styles.label}>Número</Text>
         <TextInput
            style={styles.input}
            value={endereco.numero}
            onChangeText={text => setEndereco({ ...endereco, numero: text })}
            placeholder="Digite o número"
         />
         <Text style={styles.label}>Bairro</Text>
         <TextInput
            style={styles.input}
            value={endereco.bairro}
            onChangeText={text => setEndereco({ ...endereco, bairro: text })}
            placeholder="Digite o bairro"
         />
         <Text style={styles.label}>Cidade</Text>
         <TextInput
            style={styles.input}
            value={endereco.cidade}
            onChangeText={text => setEndereco({ ...endereco, cidade: text })}
            placeholder="Digite a cidade"
         />
         <Text style={styles.label}>Complemento</Text>
         <TextInput
            style={styles.input}
            value={endereco.complemento}
            onChangeText={text =>
               setEndereco({ ...endereco, complemento: text })
            }
            placeholder="Digite o complemento"
         />
         <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Salvar Endereço</Text>
         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff'
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
      backgroundColor: '#fff',
      marginBottom: 16
   },
   button: {
      backgroundColor: theme.colors.primary,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center'
   },
   buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
   }
})
