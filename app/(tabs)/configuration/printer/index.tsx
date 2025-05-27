import { commonStyles, theme } from '@/theme'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'

import { BluetoothDevice } from 'tp-react-native-bluetooth-printer'
import { usePrinter } from '@/context/PrinterContext'

export default function TabLayout() {
   const {
      scanDevices,
      isDiscovering,
      connectToPrinter,
      devices,
      connectedPrinter
   } = usePrinter()

   return (
      <View style={commonStyles.container}>
         <TouchableOpacity
            disabled={isDiscovering}
            onPress={() => scanDevices()}
            style={[
               {
                  backgroundColor: theme.colors.primary,
                  padding: 16,
                  alignItems: 'center',
                  borderTopWidth: 0.8
               },
               isDiscovering && { backgroundColor: theme.colors.gray }
            ]}
         >
            {isDiscovering ? (
               <Text style={commonStyles.addButtonText}>Procurando...</Text>
            ) : (
               <Text style={commonStyles.addButtonText}>
                  Procurar impressoras
               </Text>
            )}
         </TouchableOpacity>
         <FlatList<BluetoothDevice>
            data={[...(devices.paired || []), ...(devices.found || [])]}
            style={{ marginTop: 5 }}
            renderItem={({ item }) => {
               const paired = item.address == connectedPrinter?.address
               return (
                  <TouchableOpacity
                     onPress={() => connectToPrinter(item)}
                     style={[
                        commonStyles.listItem,
                        { flexDirection: 'column' },
                        paired && { backgroundColor: theme.colors.primary }
                     ]}
                  >
                     <Text
                        style={[
                           { fontSize: 16 },
                           paired && commonStyles.addButtonText
                        ]}
                     >
                        {item.name}
                     </Text>
                     <Text
                        style={[
                           { fontSize: 16 },
                           paired && commonStyles.addButtonText
                        ]}
                     >
                        {item.address}
                     </Text>
                  </TouchableOpacity>
               )
            }}
         />
      </View>
   )
}
