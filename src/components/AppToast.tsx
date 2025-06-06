// ## DOCUMENTATION ##
// https://github.com/calintamas/react-native-toast-message
import { theme } from '@/theme'
import { StyleSheet, Text, View } from 'react-native'
import Toast, {
   ErrorToast,
   InfoToast,
   SuccessToast
} from 'react-native-toast-message'

export const AppToast = () => {
   return (
      <Toast
         config={toastMessageConfig}
         position="top"
         topOffset={0}
         visibilityTime={1500}
      />
   )
}

export const successToast = (message: string) => {
   Toast.show({
      type: 'success',
      text1: 'Sucesso!',
      text2: message
   })
}

export const errorToast = (message: string) => {
   Toast.show({
      type: 'error',
      text1: 'Ocorreu um erro',
      text2: message
   })
}

export const infoToast = (message: string, description?: string) => {
   Toast.show({
      type: 'info',
      text1: 'Atenção!',
      text2: message
   })
}

const toastMessageConfig = {
   success: (props: any) => (
      <SuccessToast
         {...props}
         style={{
            borderColor: theme.colors.success,
            backgroundColor: theme.colors.toastBackgroundColor,
            borderWidth: 1,
            zIndex: 9999
         }}
         text1Style={styles.commonText1Style}
         text2Style={styles.commonText2Style}
         position={'top'}
         text2NumberOfLines={3}
      />
   ),
   error: (props: any) => (
      <ErrorToast
         {...props}
         style={{
            borderColor: theme.colors.error,
            backgroundColor: theme.colors.toastBackgroundColor,
            borderWidth: 1,
            zIndex: 9999
         }}
         text1Style={styles.commonText1Style}
         text2Style={styles.commonText2Style}
         text2NumberOfLines={3}
         position={'top'}
      />
   ),
   info: (props: any) => (
      <InfoToast
         {...props}
         style={{
            borderColor: theme.colors.warning,
            backgroundColor: theme.colors.toastBackgroundColor,
            borderWidth: 1,
            zIndex: 9999
         }}
         text1Style={styles.commonText1Style}
         text2Style={styles.commonText2Style}
         position={'top'}
         text2NumberOfLines={3}
      />
   )
}

const styles = StyleSheet.create({
   commonText1Style: {
      color: theme.colors.secondary,
      fontSize: 18,
      fontWeight: 'bold'
   },
   commonText2Style: {
      color: theme.colors.secondary,
      fontSize: 15,
      flexWrap: 'wrap',
      fontWeight: '400'
   }
})
