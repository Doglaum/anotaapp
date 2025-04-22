import React from 'react'
import { Picker, PickerIOS } from '@react-native-picker/picker'
import { View, Platform, StyleProp, TextStyle } from 'react-native'
import { commonStyles } from '../theme'

export default function SelectInput({
   selectValue,
   onValueChange,
   placeholder,
   style,
   list
}: {
   onValueChange: (itemValue: any) => void
   placeholder?: string
   style: StyleProp<TextStyle>
   selectValue: any
   list: { id: number; nome: string }[]
}) {
   console.log(list)
   return (
      <View>
         <View style={commonStyles.pickerContainer}>
            {Platform.OS === 'ios' ? (
               <PickerIOS
                  selectedValue={selectValue}
                  onValueChange={onValueChange}
                  style={commonStyles.picker}
               >
                  <Picker.Item label="Selecione" value="" />
                  {list?.map(item => (
                     <Picker.Item
                        key={item.id}
                        label={item.nome}
                        value={item.id.toString()}
                     />
                  ))}
               </PickerIOS>
            ) : (
               <Picker
                  selectedValue={selectValue}
                  onValueChange={onValueChange}
                  style={commonStyles.picker}
               >
                  <Picker.Item label="Selecione" value="" />
                  {list?.map(item => (
                     <Picker.Item
                        key={item.id}
                        label={item.nome}
                        value={item.id.toString()}
                     />
                  ))}
               </Picker>
            )}
         </View>
      </View>
   )
}
