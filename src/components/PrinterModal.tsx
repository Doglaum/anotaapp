import { Button, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { OverlayerModal } from './modals'
import {
   DiscoveryDeviceType,
   usePrintersDiscovery
} from 'react-native-esc-pos-printer'
import { useEffect, useState } from 'react'
import { errorToast } from './AppToast'
import { commonStyles } from '@/theme'
import { usePrinter } from '@/context/PrinterContext'

type DeviceInfo = {
   deviceType: keyof typeof DiscoveryDeviceType
   target: string
   deviceName: string
   ipAddress: string
   macAddress: string
   bdAddress: string
}

const PrinterModal = () => {
   const { connectToPrinter, print } = usePrinter()
   const [visible, setVisible] = useState(true)
   const [printer, setPrinters] = useState()

   const [testDevices, setTestDevices] = useState<DeviceInfo[]>()

   useEffect(() => {
      setTestDevices([
         {
            deviceName: 'teste',
            deviceType: 'TYPE_PRINTER',
            target: 'teste',
            ipAddress: '1.1.1.0',
            macAddress: 'AA:11:QW:44:QW',
            bdAddress: 'teste'
         },
         {
            deviceName: 'teste',
            deviceType: 'TYPE_PRINTER',
            target: 'teste',
            ipAddress: '1.1.1.0',
            macAddress: 'AA:11:QW:44:QW',
            bdAddress: 'teste'
         },
         {
            deviceName: 'teste',
            deviceType: 'TYPE_PRINTER',
            target: 'teste',
            ipAddress: '1.1.1.0',
            macAddress: 'AA:11:QW:44:QW',
            bdAddress: 'teste'
         },
         {
            deviceName: 'teste',
            deviceType: 'TYPE_PRINTER',
            target: 'teste',
            ipAddress: '1.1.1.0',
            macAddress: 'AA:11:QW:44:QW',
            bdAddress: 'teste'
         },
         {
            deviceName: 'teste',
            deviceType: 'TYPE_PRINTER',
            target: 'teste',
            ipAddress: '1.1.1.0',
            macAddress: 'AA:11:QW:44:QW',
            bdAddress: 'teste'
         },
         {
            deviceName: 'teste',
            deviceType: 'TYPE_PRINTER',
            target: 'teste',
            ipAddress: '1.1.1.0',
            macAddress: 'AA:11:QW:44:QW',
            bdAddress: 'teste'
         },
         {
            deviceName: 'teste',
            deviceType: 'TYPE_PRINTER',
            target: 'teste',
            ipAddress: '1.1.1.0',
            macAddress: 'AA:11:QW:44:QW',
            bdAddress: 'teste'
         },
         {
            deviceName: 'teste',
            deviceType: 'TYPE_PRINTER',
            target: 'teste',
            ipAddress: '1.1.1.0',
            macAddress: 'AA:11:QW:44:QW',
            bdAddress: 'teste'
         },
         {
            deviceName: 'teste',
            deviceType: 'TYPE_PRINTER',
            target: 'teste',
            ipAddress: '1.1.1.0',
            macAddress: 'AA:11:QW:44:QW',
            bdAddress: 'teste'
         },
         {
            deviceName: 'teste',
            deviceType: 'TYPE_PRINTER',
            target: 'teste',
            ipAddress: '1.1.1.0',
            macAddress: 'AA:11:QW:44:QW',
            bdAddress: 'teste'
         }
      ])
   }, [])

   const { start, printerError, isDiscovering, printers, pairBluetoothDevice } =
      usePrintersDiscovery()

   useEffect(() => {
      if (printerError) {
         errorToast(printerError.message)
      }
   }, [printerError])

   return (
      <OverlayerModal
         title="Impressora"
         onClose={() => setVisible(false)}
         overlayModalVisible={visible}
      >
         <View style={commonStyles.container}>
            <FlatList<DeviceInfo>
               data={testDevices}
               renderItem={({ item }) => (
                  <TouchableOpacity
                     onPress={() => connectToPrinter(item)}
                     style={commonStyles.listItem}
                  >
                     <Text>{item.deviceName}</Text>
                  </TouchableOpacity>
               )}
            />
            <Button
               title="Procurar impressoras"
               onPress={() => {
                  setVisible(true)
                  start
               }}
            />
         </View>
      </OverlayerModal>
   )
}

export default PrinterModal
