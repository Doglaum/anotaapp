import {
   Text,
   TouchableOpacity,
   View,
   ViewStyle,
   StyleProp
} from 'react-native'
import { commonStyles, theme } from '@/theme'
import { OverlayerModal } from '@/components/OverlayModal'
import { Address } from '@/database/models'
import { useState } from 'react'
import { FormTextInput } from '@/components/form-inputs'
import { errorToast } from '@/components'
import { formStyle } from '@/components/form-inputs/styles'
import { MaterialIcons } from '@expo/vector-icons'

const CreateAddressModal = ({
   onClose,
   buttonStyle,
   onSave
}: {
   onClose?: () => void
   buttonStyle?: StyleProp<ViewStyle>
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
      if (address.zipCode && address.zipCode.length == 8) {
         console.log(address)
         try {
            const result = await fetch(
               `https://viacep.com.br/ws/${address.zipCode}/json/`
            ).then(response => response.json())
            console.log(result)
            setAddress(prev => ({
               ...prev,
               neighborhood: result.bairro,
               city: result.localidade,
               street: result.logradouro
            }))
         } catch (error) {
            errorToast('CEP incorreto')
            console.log(error)
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
               <View style={{ flex: 1, gap: 10 }}>
                  <FormTextInput
                     label="CEP"
                     name="zipCode"
                     value={address.zipCode}
                     onChange={changeHandle}
                     onBlur={handleCepBlur}
                     maxLength={8}
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
                  <TouchableOpacity
                     style={commonStyles.addButton}
                     onPress={handleSaveAddress}
                  >
                     <Text style={commonStyles.addButtonText}>
                        Salvar Endereço
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
