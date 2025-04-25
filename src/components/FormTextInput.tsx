import { Text, TextInput, View } from 'react-native'
import { commonStyles } from '@/theme'

export const FormTextInput = ({
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
   return (
      <View style={commonStyles.formGroup}>
         <Text style={commonStyles.formLabel}>{label}</Text>
         <TextInput
            style={commonStyles.formInput}
            value={value}
            onChangeText={text => onChange(name, text)}
         />
      </View>
   )
}
