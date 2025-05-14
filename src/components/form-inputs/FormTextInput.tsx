import {
   KeyboardAvoidingView,
   Platform,
   StyleProp,
   Text,
   TextInput,
   View,
   ViewStyle
} from 'react-native'
import { formStyle } from './styles'
import { useState } from 'react'
import { theme } from '@/theme'

export const FormTextInput = ({
   label,
   value,
   name,
   onChange,
   style,
   onBlur,
   maxLength
}: {
   label: string
   value: any
   name: string
   onChange: (name: string, text: any) => void
   onBlur?: () => void
   style?: StyleProp<ViewStyle>
   maxLength?: number
}) => {
   const [isFocus, setIsFocus] = useState(false)
   const onChangeText = (text: string) => {
      onChange(name, text)
   }

   return (
      <View style={[formStyle.formGroup, style]}>
         <Text
            style={[
               isFocus && { color: theme.colors.primary },
               formStyle.formLabel
            ]}
         >
            {label}
         </Text>
         <TextInput
            style={[
               formStyle.formInput,
               isFocus && {
                  color: theme.colors.primary,
                  borderColor: theme.colors.primary
               }
            ]}
            value={value}
            returnKeyType="done"
            onChangeText={onChangeText}
            onFocus={() => setIsFocus(true)}
            onBlur={() => {
               if (onBlur) {
                  onBlur()
               }
               setIsFocus(false)
            }}
            maxLength={maxLength}
         />
      </View>
   )
}
