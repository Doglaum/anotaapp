// ## DOCUMENTATION ##
// https://github.com/calintamas/react-native-toast-message

import Toast from 'react-native-toast-message'
import { toastMessageConfig } from '@/config/toast-message-config'

export const AppToast = () => {
   return (
      <Toast
         config={toastMessageConfig}
         position="bottom"
         bottomOffset={60}
         visibilityTime={2000}
      />
   )
}

export const successToast = (message: string, description?: string) => {
   Toast.show({
      type: 'success',
      text1: message,
      text2: description
   })
}

export const errorToast = (message: string, description?: string) => {
   Toast.show({
      type: 'error',
      text1: message,
      text2: description
   })
}

export const infoToast = (message: string, description?: string) => {
   Toast.show({
      type: 'info',
      text1: message,
      text2: description
   })
}
