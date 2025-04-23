import { Dropdown } from 'react-native-element-dropdown'
import { commonStyles } from '@/theme'

type DropdownType = {
   data: any[]
   labelField: string
   valueField: string
   placeholder: string
   onChange: (item: any) => void
}

export const SelectInput = ({
   data,
   labelField,
   valueField,
   placeholder,
   onChange
}: DropdownType) => {
   return (
      <Dropdown
         style={commonStyles.input}
         data={data}
         labelField={labelField}
         valueField={valueField}
         placeholder={placeholder}
         onChange={item => onChange(item)}
      />
   )
}
