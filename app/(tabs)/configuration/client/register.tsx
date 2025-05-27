import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   FlatList,
   Alert,
   ScrollView
} from 'react-native'
import { useEffect, useState } from 'react'
import { commonStyles, theme } from '@/theme'
import { Address, Client } from '@/database/models'
import { ClientService } from '@/services/ClientService'
import { useRouter } from 'expo-router'
import {
   EmptyList,
   FormTextInput,
   FormPhoneInput,
   CreateAddressModal,
   successToast
} from '@/components'
import { formStyle } from '@/components/form-inputs/styles'
import { MaterialIcons } from '@expo/vector-icons'

const RegisterClient = ({ editClientId }: { editClientId: number }) => {
   const router = useRouter()
   const clientService = new ClientService()

   useEffect(() => {
      if (editClientId) {
         const searchProduct = async () => {
            const editClient = await clientService.findById(editClientId)
            setClient(editClient || {})
         }
         searchProduct()
      }
   }, [])

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

   const saveAddress = (address: Partial<Address>) => {
      setClient(prev => ({
         ...prev,
         addresses: [...(prev.addresses || []), address as Address]
      }))
   }

   const deleteAddress = (addressToRemove: Partial<Address>) => {
      Alert.alert('Atenção!', `Deseja remover o endereço?`, [
         { text: 'Não' },
         {
            text: 'Sim',
            onPress: () => {
               setClient(prev => ({
                  ...prev,
                  addresses: prev.addresses?.filter(
                     address => address !== addressToRemove
                  )
               }))
               successToast('Endereço removido com sucesso!')
            }
         }
      ])
   }

   return (
      <View style={[commonStyles.container, { gap: 10 }]}>
         <FormTextInput
            label="Nome"
            name="name"
            value={client.name}
            onChange={handleChange}
         />
         <FormPhoneInput
            label="Numero para contato"
            name="phoneNumber"
            value={client.phoneNumber}
            onChange={handleChange}
         />
         <View>
            <View
               style={{
                  flexDirection: 'row',
                  marginBottom: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
               }}
            >
               <Text
                  style={[
                     formStyle.formLabel,
                     {
                        marginBottom: 10,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                     }
                  ]}
               >
                  Endereços
               </Text>
               <CreateAddressModal onSave={saveAddress} />
            </View>
         </View>
         <ScrollView keyboardShouldPersistTaps="handled">
            {client.addresses &&
               client.addresses.map((item, index) => (
                  <View
                     key={index}
                     style={{
                        flex: 1,
                        marginBottom: 5,
                        backgroundColor: theme.colors.white,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: '#ddd',
                        flexDirection: 'row',
                        padding: 5,
                        paddingTop: 15,
                        paddingBottom: 15
                     }}
                  >
                     <View
                        style={{
                           flex: 1,
                           alignItems: 'center',
                           justifyContent: 'center'
                        }}
                     >
                        <MaterialIcons
                           name="home"
                           size={24}
                           color={'lightgrey'}
                        />
                     </View>
                     <View style={{ flex: 7 }}>
                        {item.street && (
                           <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                              {item.street}, {item.number}
                           </Text>
                        )}

                        {item.neighborhood && (
                           <Text style={{ fontSize: 12 }}>
                              {item.neighborhood}
                           </Text>
                        )}
                        {item.city && (
                           <Text style={{ fontSize: 12 }}>{item.city}</Text>
                        )}

                        {item.zipCode && (
                           <Text style={{ fontSize: 12 }}>{item.zipCode}</Text>
                        )}
                     </View>
                     <View
                        style={{
                           flex: 1,
                           alignItems: 'flex-end'
                        }}
                     >
                        <TouchableOpacity onPress={() => deleteAddress(item)}>
                           <MaterialIcons
                              name="delete"
                              size={25}
                              color={'red'}
                           />
                        </TouchableOpacity>
                     </View>
                  </View>
               ))}
         </ScrollView>
         <TouchableOpacity
            style={[commonStyles.saveButton, { marginTop: 'auto' }]}
            onPress={handleSubmit}
         >
            <Text style={commonStyles.saveButtonText}>Salvar</Text>
         </TouchableOpacity>
      </View>
   )
}

export default RegisterClient

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
