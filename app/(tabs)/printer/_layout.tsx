import { Stack } from 'expo-router'
import { theme } from '@/theme'
import { usePrintersDiscovery } from 'react-native-esc-pos-printer'
import { useEffect } from 'react'
import { errorToast, PrinterModal } from '@/components'
import { Button, FlatList, View } from 'react-native'

export default function TabLayout() {
   const { start, printerError, isDiscovering, printers } =
      usePrintersDiscovery()

   useEffect(() => {
      if (printerError) {
         errorToast(printerError.message)
      }
   }, [printerError])

   return (
      <View>
         <PrinterModal />
      </View>
   )
}
