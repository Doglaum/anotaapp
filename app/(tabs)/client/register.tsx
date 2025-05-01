import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   FlatList,
   ScrollView,
   Dimensions
} from 'react-native'
import { useEffect, useState } from 'react'
import { commonStyles, theme } from '@/theme'
import { Address, Client } from '@/database/models'
import { ClientService } from '@/services/ClientService'
import { useRouter } from 'expo-router'
import { EmptyList, errorToast, FormTextInput } from '@/components'
import { formStyle } from '@/components/form-inputs/styles'
import { Button } from 'react-native-paper'

const i18n = {
   city: 'Cidade',
   complement: 'Complemento',
   neighborhood: 'Bairro',
   number: 'Número',
   street: 'Rua',
   zipCode: 'CEP'
}

export default function RegisterClient() {
   const router = useRouter()
   const clientService = new ClientService()
   const [showForm, setShowForm] = useState(false)

   useEffect(() => {
      const buscarCep = async () => {
         console.log('zeca')
      }
      buscarCep()
   }, [])

   const numColumns = 3 // Número de colunas na grid
   const screenWidth = Dimensions.get('window').width
   const [address, setAddress] = useState<Partial<Address>>({
      city: '',
      complement: '',
      neighborhood: '',
      number: '',
      street: '',
      zipCode: ''
   })
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

   const handleAddressChance = (name: string, value: any) => {
      setAddress(prev => ({
         ...prev,
         [name]: value
      }))
   }

   const handleCepBlur = async () => {
      if (address.zipCode && address.zipCode.length >= 8) {
         try {
            const result = await fetch(
               `https://viacep.com.br/ws/${address.zipCode}/json/`
            ).then(response => response.json())
            console.log(result)
            setAddress({
               city: '',
               complement: '',
               neighborhood: '',
               number: '',
               street: '',
               zipCode: ''
            })
            setAddress(prev => ({
               ...prev,
               neighborhood: result.bairro,
               city: result.localidade,
               street: result.logradouro
            }))
         } catch (error) {
            errorToast('CEP digitado incorreto')
            console.log(error)
         }
      }
   }

   const handleSaveAddress = () => {
      setClient(prev => ({
         ...prev,
         addresses: [...(prev.addresses || []), address as Address]
      }))
      setAddress({
         city: '',
         complement: '',
         neighborhood: '',
         number: '',
         street: '',
         zipCode: ''
      })
      setShowForm(false)
   }

   const addressForm = () => (
      //city: '',
      //complement: '',
      //neighborhood: '',
      //number: '',
      //street: '',
      //zipCode: ''
      <View style={{ flex: 1, gap: 10 }}>
         <FormTextInput
            label="CEP"
            name="zipCode"
            value={address.zipCode}
            onChange={handleAddressChance}
            onBlur={handleCepBlur}
         />
         <FormTextInput
            label="Bairro"
            name="neighborhood"
            value={address.neighborhood}
            onChange={handleAddressChance}
         />
         <FormTextInput
            label="Rua"
            name="street"
            value={address.street}
            onChange={handleAddressChance}
         />
         <FormTextInput
            label="Número"
            name="number"
            value={address.number}
            onChange={handleAddressChance}
         />
         <FormTextInput
            label="Complemento"
            name="complement"
            value={address.complement}
            onChange={handleAddressChance}
         />
         <FormTextInput
            label="Cidade"
            name="city"
            value={address.city}
            onChange={handleAddressChance}
         />
         <Button style={commonStyles.addButton} onPress={handleSaveAddress}>
            <Text style={commonStyles.addButtonText}>Salvar Endereço</Text>
         </Button>
      </View>
   )

   const renderItem = ({ item }: { item: Address }) => (
      <View
         style={{
            flex: 1,
            marginBottom: 5,
            backgroundColor: theme.colors.white,
            justifyContent: 'center',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ddd',
            flexDirection: 'row',
            padding: 10
         }}
      >
         <View style={{ backgroundColor: 'red', flex: 1 }}>
            <Text>teste</Text>
         </View>
         <View style={{ backgroundColor: 'blue', flex: 4 }}>
            <Text>{item.neighborhood}</Text>
            <Text>{item.number}</Text>
         </View>
         <View style={{ backgroundColor: 'red', flex: 1 }}>
            <Text>Deletar</Text>
         </View>
      </View>
   )

   return (
      <View style={[commonStyles.container, { gap: 10 }]}>
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
         <View>
            <View
               style={{
                  flexDirection: 'row',
                  marginBottom: 10,
                  alignItems: 'center',
                  justifyContent: 'center'
               }}
            >
               <Text
                  style={[formStyle.formLabel, { marginBottom: 10, flex: 1 }]}
               >
                  Endereços
               </Text>
               <TouchableOpacity
                  onPress={() => setShowForm(!showForm)}
                  style={{
                     backgroundColor: theme.colors.primary,
                     borderRadius: 8,
                     padding: 5,
                     alignItems: 'center',
                     justifyContent: 'center'
                  }}
               >
                  <Text
                     style={[
                        formStyle.formLabel,
                        { color: theme.colors.white }
                     ]}
                  >
                     {showForm ? 'Cancelar' : 'Cadastrar'}
                  </Text>
               </TouchableOpacity>
            </View>

            {showForm && <ScrollView>{addressForm()}</ScrollView>}
            {!showForm && (
               <FlatList<Address>
                  data={client.addresses}
                  renderItem={renderItem}
                  contentContainerStyle={{ padding: 10 }}
                  ListEmptyComponent={
                     <View
                        style={{
                           backgroundColor: theme.colors.white,
                           borderRadius: 8,
                           borderWidth: 0.2
                        }}
                     >
                        <EmptyList
                           iconName="hourglass-empty"
                           text="Sem endereço cadastrado"
                        />
                     </View>
                  }
               />
            )}
         </View>
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
