import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { commonStyles, theme } from '@/theme'
import { Client } from '@/database/models'
import { ClientService } from '@/services/ClientService'
import { useRouter } from 'expo-router'
import { FormTextInput } from '@/components'

export default function RegisterClient() {
   const router = useRouter()
   const clientService = new ClientService()
   const [client, setClient] = useState<Partial<Client>>({
      name: '',
      phoneNumber: '',
      addresses: []
   })

   const handleSubmit = async () => {
      await clientService.save(client as Client)
      router.back()
   }

   const handleChange = (name: string, value: any) => {
      setClient(prev => ({
         ...prev,
         [name]: value
      }))
   }

   return (
      <View style={commonStyles.container}>
         <FormTextInput
            label="Nome"
            name="name"
            value={client.name}
            onChange={handleChange}
         />
         <FormTextInput
            label="Numero"
            name="phoneNumber"
            value={client.phoneNumber}
            onChange={handleChange}
         />
         <TouchableOpacity
            style={commonStyles.saveButton}
            onPress={handleSubmit}
         >
            <Text style={commonStyles.saveButtonText}>Salvar</Text>
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
