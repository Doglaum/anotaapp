import { StyleProp, Text, TextInput, View, ViewStyle } from 'react-native'
import { formStyle } from './styles'
import { useState } from 'react'
import { theme } from '@/theme'
import MaskInput, { Masks } from 'react-native-mask-input'

export const FormZipCodeInput = ({
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
   onChange: (name: string, text: any, unmaskedValue: string) => void
   onBlur?: () => void
   style?: StyleProp<ViewStyle>
   maxLength?: number
}) => {
   const [isFocus, setIsFocus] = useState(false)
   const onChangeText = (text: string, unmaskedValue: string) => {
      onChange(name, text, unmaskedValue)
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
         <MaskInput
            style={[
               formStyle.formInput,
               isFocus && {
                  color: theme.colors.primary,
                  borderColor: theme.colors.primary
               },
               { fontSize: 16 }
            ]}
            value={value}
            returnKeyType="done"
            keyboardType="numeric"
            mask={Masks.ZIP_CODE}
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
