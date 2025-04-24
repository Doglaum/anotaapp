import {
   View,
   Text,
   StyleSheet,
   TextInput,
   TouchableOpacity,
   ScrollView
} from 'react-native'
import { useEffect, useState } from 'react'
import { commonStyles, theme } from '@/theme'
import { Client } from '@/database/models/Client'
import { ClientService } from '@/services/ClientService'
import { useLocalSearchParams, useRouter } from 'expo-router'

export default function UpdateClient() {
   const [client, setClient] = useState<Partial<Client>>({
      name: '',
      phoneNumber: ''
   })
   const router = useRouter()
   const clientService = new ClientService()
   const { id } = useLocalSearchParams<{ id: string }>()
   const numberId = Number(id)
   useEffect(() => {
      const loadClient = async () => {
         try {
            const searchedClient = await clientService.findById(numberId)
            if (searchedClient) {
               setClient(searchedClient)
            } else {
               console.error('Cliente não encontrado.')
               router.push('/client')
            }
         } catch (error) {
            console.error('Erro ao carregar cliente:', error)
         }
      }

      loadClient()
   }, [numberId])

   const handleSubmit = async () => {
      await clientService.update(numberId, client)
      router.push('/client')
   }

   return (
      <ScrollView style={styles.container}>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
               style={styles.input}
               value={client.name}
               onChangeText={text => setClient({ ...client, name: text })}
               placeholder="Digite o nome do cliente"
            />
         </View>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Telefone</Text>
            <TextInput
               style={styles.input}
               value={client.phoneNumber}
               onChangeText={text =>
                  setClient({ ...client, phoneNumber: text })
               }
               placeholder="Digite o telefone do cliente"
            />
         </View>
         <TouchableOpacity
            style={commonStyles.editButton}
            onPress={handleSubmit}
         >
            <Text style={commonStyles.editButtonText}>Salvar</Text>
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
