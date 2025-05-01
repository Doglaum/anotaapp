import { View, Text } from 'react-native'
import CurrencyInput from 'react-native-currency-input'
import { formStyle } from './styles'
import { useEffect, useState } from 'react'
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
   const [localValue, setLocalValue] = useState(0)
   const [isFocus, setIsFocus] = useState(false)
   const onChangeText = (value: number) => {
      setLocalValue(value)
      onChange(name, value)
   }

   useEffect(() => {
      if (!value) {
         setLocalValue(value)
      }
   }, [value])
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
         <CurrencyInput
            style={[
               formStyle.formInput,
               isFocus && {
                  color: theme.colors.primary,
                  borderColor: theme.colors.primary
               }
            ]}
            value={localValue}
            onChangeValue={onChangeText}
            minValue={0}
            delimiter="."
            separator=","
            placeholder="0"
            keyboardType="decimal-pad"
            inputMode="decimal"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
         />
      </View>
   )
}
