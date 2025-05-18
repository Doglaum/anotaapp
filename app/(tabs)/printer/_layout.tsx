import { commonStyles, theme } from '@/theme'
import {
   DiscoveryDeviceType,
   usePrintersDiscovery
} from 'react-native-esc-pos-printer'
import { useEffect, useState } from 'react'
import { errorToast, PrinterModal } from '@/components'
import { Button, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { usePrinter } from '@/context/PrinterContext'

type DeviceInfo = {
   deviceType: keyof typeof DiscoveryDeviceType
   target: string
   deviceName: string
   ipAddress: string
   macAddress: string
   bdAddress: string
}

export default function TabLayout() {
   const { connectToPrinter } = usePrinter()
   const { start, printerError, printers, isDiscovering } =
      usePrintersDiscovery()

   useEffect(() => {
      if (printerError) {
         errorToast(printerError.message)
      }
   }, [printerError])

   return (
      <View style={{ flex: 1 }}>
         <View style={commonStyles.container}>
            <TouchableOpacity
               disabled={isDiscovering}
               onPress={() => start()}
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
            <View>
               <FlatList<DeviceInfo>
                  data={printers}
                  renderItem={({ item }) => (
                     <TouchableOpacity
                        onPress={() => connectToPrinter(item)}
                        style={commonStyles.listItem}
                     >
                        <Text>{item.deviceName}</Text>
                     </TouchableOpacity>
                  )}
               />
            </View>
         </View>
      </View>
   )
}
