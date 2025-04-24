import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { MultiSelect } from 'react-native-element-dropdown'
import AntDesign from '@expo/vector-icons/AntDesign'
import { commonStyles } from '../theme'

type MultiSelectType = {
   data: any[]
   labelField: string
   valueField: string
   placeholder: string
   onChange: (item: any) => void
}

export const MultiSelectInput = ({
   data,
   labelField,
   onChange,
   placeholder,
   valueField
}: MultiSelectType) => {
   const [selected, setSelected] = useState<string[]>([])

   return (
      <MultiSelect
         style={commonStyles.input}
         placeholderStyle={styles.placeholderStyle}
         selectedTextStyle={styles.selectedTextStyle}
         inputSearchStyle={styles.inputSearchStyle}
         data={data}
         labelField={labelField}
         valueField={valueField}
         placeholder={placeholder}
         value={selected}
         search
         searchPlaceholder="Procurar..."
         onChange={item => {
            setSelected(item)
         }}
         renderItem={item => (
            <View style={styles.item}>
               <Text style={styles.selectedTextStyle}>{item.label}</Text>
            </View>
         )}
         renderSelectedItem={(item, unSelect) => (
            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
               <View style={styles.selectedStyle}>
                  <Text style={styles.textSelectedStyle}>{item.label}</Text>
                  <AntDesign color="black" name="delete" size={17} />
               </View>
            </TouchableOpacity>
         )}
      />
   )
}

const styles = StyleSheet.create({
   container: { padding: 16 },
   placeholderStyle: {
      fontSize: 16
   },
   selectedTextStyle: {
      fontSize: 11
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
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   selectedStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 14,
      backgroundColor: 'white',
      shadowColor: '#000',
      marginTop: 8,
      marginRight: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
      shadowOffset: {
         width: 0,
         height: 1
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2
   },
   textSelectedStyle: {
      marginRight: 1,
      fontSize: 11
   }
})
