import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { commonStyles } from '@/theme'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

const SearchInput = ({
   onChange,
   rota,
   label
}: {
   onChange: (text: string) => void
   rota?: string
   label?: string
}) => {
   return (
      <View style={commonStyles.searchContainer}>
         <TextInput
            style={commonStyles.formInput}
            placeholder={label}
            onChangeText={text => onChange(text)}
         />
         {rota && (
            <TouchableOpacity
               style={commonStyles.addButton}
               onPress={() => router.push(rota)}
            >
               <MaterialIcons name="add" size={24} color="#fff" />
            </TouchableOpacity>
         )}
      </View>
   )
}

export default SearchInput
