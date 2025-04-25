import { View, Text } from 'react-native'
import { commonStyles } from '@/theme'
import { SelectInput } from '../SelectInput'
import { Dropdown } from 'react-native-element-dropdown'

export const FormSelectInput = <T extends object>({
   label,
   data,
   onChange,
   labelField,
   valueField,
   name
}: {
   label: string
   data: any[]
   onChange: (name: keyof T, value: T[keyof T]) => void
   labelField: string
   valueField: string
   name: keyof T
}) => {
   return (
      <View style={commonStyles.formGroup}>
         <Dropdown
            style={[commonStyles.formInput, { padding: 10 }]}
            data={data}
            labelField={labelField}
            valueField={valueField}
            placeholder={label}
            onChange={item => onChange(name, item)}
         />
      </View>
   )
}
