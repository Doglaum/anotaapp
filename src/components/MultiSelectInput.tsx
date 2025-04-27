import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { MultiSelect } from 'react-native-element-dropdown'
import { commonStyles, theme } from '../theme'
import { MaterialIcons } from '@expo/vector-icons'
import { formStyle } from './form-inputs/styles'
import { useState } from 'react'

type MultiSelectType = {
   value: string[]
   data: any[]
   labelField: string
   valueField: string
   placeholder: string
   setIngredients: (item: any) => void
}

export const MultiSelectInput = ({
   value,
   data,
   labelField,
   setIngredients,
   placeholder,
   valueField
}: MultiSelectType) => {
   const [isFocus, setIsFocus] = useState(false)
   return (
      <View
         style={{ flex: 1, backgroundColor: theme.colors.appContainerColor }}
      >
         <MultiSelect
            style={[
               formStyle.dropdown,
               isFocus && { borderColor: theme.colors.primary }
            ]}
            selectedStyle={styles.selectedStyle}
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
            labelField={labelField}
            valueField="id"
            placeholder={placeholder}
            value={value}
            search
            searchPlaceholder="Procurar..."
            onChange={setIngredients}
            alwaysRenderSelectedItem
            visibleSelectedItem
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   container: { padding: 16 },
   placeholderStyle: {
      fontSize: 16
   },
   selectedTextStyle: {
      fontSize: 11,
      height: 50
   },
   iconStyle: {
      width: 20,
      height: 20
   },
   inputSearchStyle: {
      height: 40,
      fontSize: 16
   },
   icon: {
      marginRight: 5
   },
   item: {
      flex: 1,
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 50
   },
   selectedStyle: {
      backgroundColor: '#fa0c5b',
      marginRight: 10,
      fontSize: 11,
      borderRadius: 8
   },

   selectTextStyle: {
      fontSize: 13,
      color: 'white'
   }
})
