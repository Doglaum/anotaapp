import {
   View,
   Text,
   StyleSheet,
   TextInput,
   TouchableOpacity
} from 'react-native'
import { useState } from 'react'
import { theme } from '@/theme'
import { useRouter } from 'expo-router'

export default function CadastroEndereco() {
   const router = useRouter()
   const [endereco, setEndereco] = useState({
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: ''
   })

   const handleSave = () => {
      console.log('Endereço salvo:', endereco)
      router.back() // Volta para a tela anterior
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
         <Text style={styles.label}>Estado</Text>
         <TextInput
            style={styles.input}
            value={endereco.estado}
            onChangeText={text => setEndereco({ ...endereco, estado: text })}
            placeholder="Digite o estado"
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
