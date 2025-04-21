import {
   View,
   Text,
   StyleSheet,
   TextInput,
   TouchableOpacity,
   ScrollView
} from 'react-native'
import { useState } from 'react'
import { theme } from '@/theme'
import { Cliente } from '@models/Cliente'
import { ClienteService } from '@/services/ClienteService'
import { useRouter, Stack } from 'expo-router'

export default function ClienteForm() {
   const router = useRouter()
   const clienteService = new ClienteService()
   const [cliente, setCliente] = useState<Partial<Cliente>>({
      nome: '',
      telefone: '',
      endereco: ''
   })

   const handleSubmit = async () => {
      await clienteService.criarCliente(cliente as Cliente)
      console.log('Produto a ser salvo:', cliente)
      router.push('/clientes')
   }

   return (
      <ScrollView style={styles.container}>
         <Stack.Screen
            options={{
               title: 'Cadastro Clientes'
            }}
         />
         <View style={styles.formGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
               style={styles.input}
               value={cliente.nome}
               onChangeText={text => setCliente({ ...cliente, nome: text })}
               placeholder="Digite o nome"
            />
         </View>

         <View style={styles.formGroup}>
            <Text style={styles.label}>Telefone</Text>
            <TextInput
               style={styles.input}
               value={cliente.telefone}
               onChangeText={text => setCliente({ ...cliente, telefone: text })}
               placeholder="Digite o telefone"
            />
         </View>

         <View style={styles.formGroup}>
            <Text style={styles.label}>Endereço</Text>
            <TextInput
               style={[styles.input, styles.textArea]}
               value={cliente.endereco}
               onChangeText={text => setCliente({ ...cliente, endereco: text })}
               placeholder="Digite o endereço"
               multiline
               numberOfLines={4}
            />
         </View>

         <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Salvar</Text>
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
