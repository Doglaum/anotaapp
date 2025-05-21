import {
   Text,
   TouchableOpacity,
   View,
   ViewStyle,
   StyleProp,
   ScrollView
} from 'react-native'
import { commonStyles, theme } from '@/theme'
import { OverlayerModal } from '@/components/modals/'
import { Address } from '@/database/models'
import { useState } from 'react'
import { FormTextInput, FormZipCodeInput } from '@/components/form-inputs'
import { errorToast } from '@/components'
import { formStyle } from '@/components/form-inputs/styles'
import { MaterialIcons } from '@expo/vector-icons'

const CreateAddressModal = ({
   onSave
}: {
   onSave: (address: Partial<Address>) => void
}) => {
   const [overlayModalVisible, setOverlayModalVisible] =
      useState<boolean>(false)
   const [address, setAddress] = useState<Partial<Address>>({
      city: '',
      complement: '',
      neighborhood: '',
      number: '',
      street: '',
      zipCode: ''
   })

   const changeHandle = (name: string, value: any) => {
      setAddress(prev => ({
         ...prev,
         [name]: value
      }))
   }

   const handleClose = () => {
      setAddress({
         city: '',
         complement: '',
         neighborhood: '',
         number: '',
         street: '',
         zipCode: ''
      })
   }

   const handleCepBlur = async () => {
      if (address.zipCode && address.zipCode.length == 9) {
         const formatedZipCode = address.zipCode.replace('-', '')
         try {
            const result = await fetch(
               `https://viacep.com.br/ws/${formatedZipCode}/json/`
            ).then(response => response.json())
            if (result.erro) {
               throw new Error()
            }
            setAddress(prev => ({
               ...prev,
               neighborhood: result.bairro,
               city: result.localidade,
               street: result.logradouro
            }))
         } catch (error) {
            setAddress(prev => ({
               ...prev,
               neighborhood: '',
               city: '',
               street: ''
            }))
            errorToast('CEP incorreto')
            console.error(error)
         }
      }
   }

   const handleSaveAddress = () => {
      onSave(address)
      setAddress({
         city: '',
         complement: '',
         neighborhood: '',
         number: '',
         street: '',
         zipCode: ''
      })
      setOverlayModalVisible(false)
   }

   return (
      <View>
         <OverlayerModal
            title="Cadastrar Endereço"
            onClose={() => {
               setOverlayModalVisible(false)
               handleClose()
            }}
            overlayModalVisible={overlayModalVisible}
         >
            <View style={commonStyles.container}>
               <ScrollView style={{ flex: 1, gap: 10 }}>
                  <FormZipCodeInput
                     label="CEP"
                     name="zipCode"
                     value={address.zipCode}
                     onChange={changeHandle}
                     onBlur={handleCepBlur}
                  />
                  <FormTextInput
                     label="Bairro"
                     name="neighborhood"
                     value={address.neighborhood}
                     onChange={changeHandle}
                  />
                  <FormTextInput
                     label="Rua"
                     name="street"
                     value={address.street}
                     onChange={changeHandle}
                  />
                  <FormTextInput
                     label="Número"
                     name="number"
                     value={address.number}
                     onChange={changeHandle}
                  />
                  <FormTextInput
                     label="Complemento"
                     name="complement"
                     value={address.complement}
                     onChange={changeHandle}
                  />
                  <FormTextInput
                     label="Cidade"
                     name="city"
                     value={address.city}
                     onChange={changeHandle}
                  />
               </ScrollView>
               <TouchableOpacity
                  style={[commonStyles.addButton, { marginTop: 10 }]}
                  onPress={handleSaveAddress}
               >
                  <Text style={commonStyles.addButtonText}>
                     Salvar Endereço
                  </Text>
               </TouchableOpacity>
            </View>
         </OverlayerModal>
         <TouchableOpacity
            onPress={() => setOverlayModalVisible(true)}
            style={{
               backgroundColor: theme.colors.primary,
               borderRadius: 8,
               padding: 10,
               alignItems: 'center',
               justifyContent: 'center',
               flexDirection: 'row'
            }}
         >
            <Text style={[formStyle.formLabel, { color: theme.colors.white }]}>
               Cadastrar
            </Text>
            <MaterialIcons name="add-location-alt" size={14} color={'white'} />
         </TouchableOpacity>
      </View>
   )
}

export default CreateAddressModal
