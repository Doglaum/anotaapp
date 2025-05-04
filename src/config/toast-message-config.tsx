import { theme } from '@/theme'
import Toast, {
   ErrorToast,
   InfoToast,
   SuccessToast
} from 'react-native-toast-message'

export const toastMessageConfig = {
   success: (props: any) => (
      <SuccessToast
         {...props}
         style={{
            borderColor: theme.colors.success,
            backgroundColor: theme.colors.toastBackgroundColor,
            borderWidth: 1
         }}
         text1Style={{
            color: theme.colors.secondary,
            fontSize: 15,
            fontWeight: '400'
         }}
         position={'top'}
      />
   ),
   error: (props: any) => (
      <ErrorToast
         {...props}
         style={{
            borderColor: theme.colors.error,
            backgroundColor: theme.colors.toastBackgroundColor,
            borderWidth: 1
         }}
         text1Style={{
            color: theme.colors.secondary,
            fontSize: 15,
            fontWeight: '400'
         }}
         position={'top'}
      />
   ),
   info: (props: any) => (
      <InfoToast
         {...props}
         style={{
            borderColor: theme.colors.warning,
            backgroundColor: theme.colors.toastBackgroundColor,
            borderWidth: 1
         }}
         text1Style={{
            color: theme.colors.secondary,
            fontSize: 15,
            fontWeight: '400'
         }}
         position={'top'}
      />
   )
}
