import { errorToast, PrinterModal } from '@/components'
import { Redirect } from 'expo-router'
import { useEffect } from 'react'
import { Button, FlatList, View } from 'react-native'
import { usePrintersDiscovery } from 'react-native-esc-pos-printer'

const PrintersDiscovering = () => {
   return (
      <View>
         <PrinterModal />
      </View>
   )
}
