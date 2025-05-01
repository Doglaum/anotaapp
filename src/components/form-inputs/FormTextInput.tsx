import { StyleProp, Text, TextInput, View, ViewStyle } from 'react-native'
import { formStyle } from './styles'
import { useEffect, useState } from 'react'
import { theme } from '@/theme'

export const FormTextInput = ({
   label,
   value,
   name,
   onChange,
   style,
   onBlur
}: {
   label: string
   value: any
   name: string
   onChange: (name: string, text: any) => void
   onBlur?: () => void
   style?: StyleProp<ViewStyle>
}) => {
   const [localValue, setLocalValue] = useState(value)
   const [isFocus, setIsFocus] = useState(false)
   const onChangeText = (text: string) => {
      setLocalValue(text)
      onChange(name, text)
   }

   useEffect(() => {
      console.log(value)
      if (!localValue) {
         setLocalValue(value)
      }
   }, [value])

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
               },
               { fontSize: 12 }
            ]}
            value={localValue}
            onChangeText={onChangeText}
            onFocus={() => setIsFocus(true)}
            onBlur={() => {
               if (onBlur) {
                  onBlur()
               }
               setIsFocus(false)
            }}
         />
      </View>
   )
}
