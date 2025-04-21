import {
   View,
   Text,
   StyleSheet,
   TextInput,
   TouchableOpacity,
   ScrollView
} from 'react-native'
import { useEffect, useState } from 'react'
import { theme } from '../../../../src/theme'
import { Cliente } from '@models/Cliente'
import { ClienteService } from '@/services/ClienteService'
import { useLocalSearchParams, useRouter } from 'expo-router'

type EditarClienteParams = {
   id: number
}

export default function ClienteForm() {
   const [cliente, setCliente] = useState<Partial<Cliente>>({
      nome: '',
      telefone: '',
      endereco: ''
   })
   const router = useRouter()
   const clienteService = new ClienteService()
   const { id } = useLocalSearchParams<{ id: string }>()
   const numberId = Number(id)
   useEffect(() => {
      const loadCliente = async () => {
         try {
            const cliente = await clienteService.buscarCliente(numberId)
            if (cliente) {
               setCliente(cliente)
            } else {
               console.error('Cliente não encontrado.')
               router.push('/clientes')
            }
         } catch (error) {
            console.error('Erro ao carregar cliente:', error)
         }
      }

      loadCliente()
   }, [numberId])

   const handleSubmit = async () => {
      await clienteService.atualizarCliente(numberId, cliente)
      console.log('Cliente a ser salvo:', cliente)
      router.push('/clientes')
   }

   return (
      <ScrollView style={styles.container}>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
               style={styles.input}
               value={cliente.nome}
               onChangeText={text => setCliente({ ...cliente, nome: text })}
               placeholder="Digite o nome do cliente"
            />
         </View>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Telefone</Text>
            <TextInput
               style={styles.input}
               value={cliente.telefone}
               onChangeText={text => setCliente({ ...cliente, telefone: text })}
               placeholder="Digite o telefone do cliente"
            />
         </View>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Endereço</Text>
            <TextInput
               style={[styles.input, styles.textArea]}
               value={cliente.endereco}
               onChangeText={text => setCliente({ ...cliente, endereco: text })}
               placeholder="Digite o endereço do cliente"
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
