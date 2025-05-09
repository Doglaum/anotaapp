import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { OverlayerModal } from '@/components/OverlayModal'
import RegisterClient from '@/(tabs)/client/register'
import { TouchableOpacity } from 'react-native'
import { formStyle } from '@/components/form-inputs/styles'
import { commonStyles, theme } from '@/theme'
import { MaterialIcons } from '@expo/vector-icons'
import { FormTextInput } from '@/components'
import { Client } from '@/database/models'
import { ClientService } from '@/services'

const CreateClientModal = ({
   onSave
}: {
   onSave: (client: Client) => void
}) => {
   const clientService = new ClientService()
   const [overlayModalVisible, setOverlayModalVisible] =
      useState<boolean>(false)

   const [client, setClient] = useState<Partial<Client>>({
      name: '',
      phoneNumber: '',
      addresses: []
   })

   const handleSubmit = async () => {
      const newClient = await clientService.save(client as Client)
      onSave(newClient)
      setClient({
         name: '',
         phoneNumber: '',
         addresses: []
      })
      setOverlayModalVisible(false)
      console.log(client)
   }

   const handleChange = (name: string, value: any) => {
      setClient(prev => ({
         ...prev,
         [name]: value
      }))
   }

   return (
      <View>
         <OverlayerModal
            title="Cadastrar Cliente"
            overlayModalVisible={overlayModalVisible}
            onClose={() => setOverlayModalVisible(false)}
         >
            <View style={commonStyles.container}>
               <View style={{ flex: 1, gap: 10 }}>
                  <FormTextInput
                     label="Nome"
                     name="name"
                     value={client.name}
                     onChange={handleChange}
                  />
                  <FormTextInput
                     label="Numero para contato"
                     name="phoneNumber"
                     value={client.phoneNumber}
                     onChange={handleChange}
                  />
                  <TouchableOpacity
                     style={commonStyles.saveButton}
                     onPress={handleSubmit}
                  >
                     <Text style={commonStyles.addButtonText}>
                        Salvar Cliente
                     </Text>
                  </TouchableOpacity>
               </View>
            </View>
         </OverlayerModal>
         <TouchableOpacity
            onPress={() => setOverlayModalVisible(true)}
            style={{
               backgroundColor: theme.colors.primary,
               borderRadius: 8,
               padding: 8,
               alignItems: 'center',
               justifyContent: 'center',
               flexDirection: 'row'
            }}
         >
            <MaterialIcons name="person-add" size={28} color={'white'} />
         </TouchableOpacity>
      </View>
   )
}

export default CreateClientModal
