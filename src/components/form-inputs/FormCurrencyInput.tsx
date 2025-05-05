import {
   View,
   Text,
   TextInput,
   TouchableWithoutFeedback,
   Keyboard,
   KeyboardAvoidingView,
   Platform
} from 'react-native'
import MaskInput, { Masks } from 'react-native-mask-input'
import { formStyle } from './styles'
import { useState } from 'react'
import { theme } from '@/theme'

export const FormCurrencyInput = ({
   label,
   value,
   name,
   onChange
}: {
   label: string
   value: any
   name: string
   onChange: (name: string, text: any) => void
}) => {
   const [isFocus, setIsFocus] = useState(false)
   const [localValue, setLocalValue] = useState('')
   const onChangeText = (value: number) => {
      onChange(name, value)
   }

   const handleChangeText = (text: string) => {
      console.log(text)
      setLocalValue(text)
   }

   return (
      <View style={formStyle.formGroup}>
         <Text
            style={[
               isFocus && { color: theme.colors.primary },
               formStyle.formLabel
            ]}
         >
            {label}
         </Text>
         <MaskInput
            mask={Masks.BRL_CURRENCY}
            value={localValue}
            onChangeText={(masked, unmasked) => {
               handleChangeText(masked)
               onChangeText(Number(parseFloat(unmasked)))
            }}
            placeholder="R$ 0,00"
            keyboardType="numeric"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            style={[
               formStyle.formInput,
               isFocus && {
                  color: theme.colors.primary,
                  borderColor: theme.colors.primary
               },
               { fontSize: 12 }
            ]}
         />
      </View>
   )
}
