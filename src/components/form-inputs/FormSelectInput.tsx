import { StyleSheet, Text, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { formStyle } from './styles'
import { useState } from 'react'
import { theme } from '@/theme'

export const FormSelectInput = <T extends object>({
   label,
   data,
   onChange,
   labelField,
   valueField,
   name,
   placeholder
}: {
   label: string
   data: any[]
   onChange: (name: keyof T, value: T[keyof T]) => void
   labelField: string
   valueField: string
   name: keyof T
   placeholder: string
}) => {
   const [isFocus, setIsFocus] = useState(false)
   return (
      <View style={{ flex: 1 }}>
         <Text
            style={[
               isFocus && { color: theme.colors.primary },
               formStyle.formLabel
            ]}
         >
            {label}
         </Text>
         <Dropdown
            style={[
               formStyle.dropdown,
               isFocus && { borderColor: theme.colors.primary }
            ]}
            selectedTextStyle={[
               styles.selectTextStyle,
               isFocus && {
                  color: theme.colors.primary,
                  borderColor: theme.colors.primary
               }
            ]}
            placeholderStyle={[
               styles.selectTextStyle,
               { color: theme.colors.placeholder },
               isFocus && {
                  color: theme.colors.primary,
                  borderColor: theme.colors.primary
               }
            ]}
            data={data}
            maxHeight={300}
            labelField={labelField}
            valueField={valueField}
            placeholder={placeholder}
            value={valueField}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
               onChange(name, item)
               setIsFocus(false)
            }}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   selectTextStyle: {
      fontSize: 13
   }
})
