import {
   View,
   Text,
   ScrollView,
   FlatList,
   Button,
   TouchableOpacity
} from 'react-native'
import { Address, Order } from '@/database/models'
import { StyleSheet } from 'react-native'
import { theme } from '@/theme'
import { MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'

const AddressStep = ({
   order,
   insertOrderData
}: {
   order: Partial<Order>
   insertOrderData: <K extends keyof Order>(campo: K, valor: Order[K]) => void
}) => {
   const [selectedAddress, setSelectedAddress] = useState<Address>(
      {} as Address
   )
   if (!order.client?.addresses.length) {
      return <Button title="Cadastrar novo endereço"></Button>
   }

   const addressListItem = ({ item }: { item: Address }) => {
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
               <MaterialIcons name="home" size={24} color={'lightgrey'} />
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
   }

   return (
      <View>
         <FlatList<Address>
            keyExtractor={(item, index) => index.toString()}
            data={order.client?.addresses}
            renderItem={addressListItem}
            contentContainerStyle={{ padding: 10 }}
         />
      </View>
   )
}

const commonStyles = StyleSheet.create({})

export default AddressStep
