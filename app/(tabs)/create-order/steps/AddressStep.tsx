import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Address, Client, Order } from '@/database/models'
import { MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { CreateAddressModal } from '@/components'
import { ClientService } from '@/services'
import { theme } from '@/theme'

const AddressStep = ({
   order,
   insertOrderData
}: {
   order: Partial<Order>
   insertOrderData: <K extends keyof Order>(campo: K, valor: Order[K]) => void
}) => {
   const clientService = new ClientService()
   const [selectedAddress, setSelectedAddress] = useState<Address>(
      {} as Address
   )

   const onSave = async (address: Partial<Address>) => {
      let client = order.client || ({} as Client)
      client.addresses = [...client.addresses, address as Address]
      client = await clientService.save(client)
      insertOrderData('client', client)
   }

   return (
      <View
         style={{
            flex: 1
         }}
      >
         <View
            style={{
               marginRight: 'auto',
               paddingHorizontal: 10
            }}
         >
            <CreateAddressModal onSave={onSave}></CreateAddressModal>
         </View>
         <FlatList<Address>
            keyExtractor={(item, index) => index.toString()}
            data={order.client?.addresses}
            renderItem={({ item }: { item: Address }) => {
               const isSelected = order.address?.addressId === item.addressId
               return (
                  <TouchableOpacity
                     onPress={() => insertOrderData('address', item)}
                     style={[
                        {
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
                        },
                        isSelected && {
                           backgroundColor: theme.colors.primary
                        }
                     ]}
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
                           <Text
                              style={[
                                 { fontWeight: 'bold', fontSize: 14 },
                                 isSelected && { color: theme.colors.white }
                              ]}
                           >
                              {item.street}, {item.number}
                           </Text>
                        )}

                        {item.neighborhood && (
                           <Text
                              style={[
                                 { fontSize: 12 },
                                 isSelected && { color: theme.colors.white }
                              ]}
                           >
                              {item.neighborhood}
                           </Text>
                        )}
                        {item.city && (
                           <Text
                              style={[
                                 { fontSize: 12 },
                                 isSelected && { color: theme.colors.white }
                              ]}
                           >
                              {item.city}
                           </Text>
                        )}

                        {item.zipCode && (
                           <Text
                              style={[
                                 { fontSize: 12 },
                                 isSelected && { color: theme.colors.white }
                              ]}
                           >
                              {item.zipCode}
                           </Text>
                        )}
                     </View>
                  </TouchableOpacity>
               )
            }}
            contentContainerStyle={{ padding: 10 }}
         />
      </View>
   )
}

export default AddressStep
