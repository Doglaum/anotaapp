import {
   View,
   Text,
   TextInput,
   TouchableOpacity,
   StyleSheet,
   StyleProp,
   ViewStyle
} from 'react-native'
import React, { useState } from 'react'
import { commonStyles } from '@/theme'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { formStyle } from './styles'

export const FormSearchInput = ({
   onChange,
   rota,
   label,
   value,
   style
}: {
   onChange: (text: string) => void
   rota?: string
   label?: string
   value?: any
   style?: StyleProp<ViewStyle>
}) => {
   const [localValue, setLocalValue] = useState(value)
   const onChangeText = (text: string) => {
      setLocalValue(text)
      onChange(text)
   }

   return (
      <View style={[styles.searchContainer, style]}>
         <TextInput
            style={[
               formStyle.formInput,
               { flex: 1 },
               rota && { borderRightWidth: 0 }
            ]}
            returnKeyType="done"
            value={localValue}
            placeholder={label}
            onChangeText={onChangeText}
         />
         {rota && (
            <TouchableOpacity
               style={[commonStyles.addButton, { justifyContent: 'center' }]}
               onPress={() => router.push(rota)}
            >
               <MaterialIcons name="add" size={18} color="#fff" />
            </TouchableOpacity>
         )}
      </View>
   )
}

const styles = StyleSheet.create({
   searchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#fff'
   }
})
