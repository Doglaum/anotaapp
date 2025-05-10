import { theme } from '@/theme'
import { StyleSheet } from 'react-native'
import Toast, {
   ErrorToast,
   InfoToast,
   SuccessToast
} from 'react-native-toast-message'

const styles = StyleSheet.create({
   commonText1Style: {
      color: theme.colors.secondary,
      fontSize: 15,
      fontWeight: 'bold'
   },
   commonText2Style: {
      color: theme.colors.secondary,
      fontSize: 12,
      fontWeight: '400'
   }
})

export const toastMessageConfig = {
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
      />
   ),
   error: (props: any) => (
      <ErrorToast
         {...props}
         style={{
            borderColor: theme.colors.error,
            backgroundColor: theme.colors.toastBackgroundColor,
            borderWidth: 1,
            zIndex: 9999,
            position: 'absolute'
         }}
         text1Style={styles.commonText1Style}
         text2Style={styles.commonText2Style}
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
      />
   )
}
