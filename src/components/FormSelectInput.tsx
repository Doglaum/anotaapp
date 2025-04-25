import { View, Text } from 'react-native'
import { commonStyles } from '@/theme'
import { SelectInput } from './SelectInput'

const FormSelectInput = ({
   label,
   data,
   changeValue,
   labelField,
   valueField,
   name
}: {
   label: string
   data: any[]
   changeValue: (name: string, text: any) => void
   labelField: string
   valueField: string
   name: string
}) => {
   return (
      <View style={commonStyles.formGroup}>
         <Text style={commonStyles.formLabel}>{label}</Text>
         <SelectInput
            data={data || []}
            labelField={labelField}
            valueField={valueField}
            placeholder={label}
            onChange={value => changeValue(name, value)}
         />
      </View>
   )
}

export default FormSelectInput
