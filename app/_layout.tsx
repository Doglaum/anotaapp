import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PaperProvider } from 'react-native-paper'
import { theme } from '../src/theme'
import { useEffect, useState } from 'react'
import { View, ActivityIndicator, Text, StatusBar } from 'react-native'
import { initDatabase } from '../src/database/database'
import { AppToast } from '@/components/AppToast'
import { PrinterProvider, usePrinter } from '@/context/PrinterContext'
import { SystemParamsService } from '@/services'
import { BluetoothDevice } from 'tp-react-native-bluetooth-printer'

export default function RootLayout() {
   const [isReady, setIsReady] = useState(false)
   const systemParamsService = new SystemParamsService()

   useEffect(() => {
      const init = async () => {
         try {
            await initDatabase()
            setIsReady(true)
         } catch (error) {
            console.error('Erro ao inicializar o banco de dados:', error)
         }
      }

      init()
   }, [])

   if (!isReady) {
      return (
         <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
         >
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={{ marginTop: 10 }}>Carregando...</Text>
         </View>
      )
   }

   return (
      <SafeAreaProvider>
         <StatusBar
            barStyle={'light-content'}
            backgroundColor={theme.colors.secondary}
         />
         <PaperProvider>
            <PrinterProvider>
               <Stack>
                  <Stack.Screen
                     name="(tabs)"
                     options={{ headerShown: false }}
                  />
               </Stack>
            </PrinterProvider>
            <AppToast />
         </PaperProvider>
      </SafeAreaProvider>
   )
}
