import {
   View,
   Text,
   StyleSheet,
   TextInput,
   TouchableOpacity,
   ScrollView,
   FlatList
} from 'react-native'
import { useState } from 'react'
import { commonStyles, theme } from '@/theme'
import { Client } from '@/database/models'
import { ClientService } from '@/services/ClientService'
import { useRouter } from 'expo-router'

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

   return (
      <View style={commonStyles.container}>
         <ScrollView style={commonStyles.container}>
            <View style={styles.formGroup}>
               <Text style={commonStyles.title}>Nome</Text>
               <TextInput
                  style={commonStyles.input}
                  value={client.name}
                  onChangeText={text => setClient({ ...client, name: text })}
                  placeholder="Digite o nome"
               />
            </View>

            <View style={styles.formGroup}>
               <Text style={commonStyles.title}>Telefone</Text>
               <TextInput
                  style={commonStyles.input}
                  value={client.phoneNumber}
                  onChangeText={text =>
                     setClient({ ...client, phoneNumber: text })
                  }
                  placeholder="Digite o telefone"
               />
            </View>
            {/* <FlatList<Endereco>
            data={cliente.enderecos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
               <View style={commonStyles.listItem}>
                  <View>
                     <Text>
                        {item.bairro} {' - '} {item.rua}
                     </Text>
                  </View>
               </View>
            )}
            ListEmptyComponent={
               <EmptyList iconName="person" text="Nenhum cliente cadastrado" />
            }
         /> */}
         </ScrollView>
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
