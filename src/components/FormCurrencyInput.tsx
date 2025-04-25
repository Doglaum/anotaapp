import { View, Text } from 'react-native'
import { commonStyles } from '@/theme'
import CurrencyInput from 'react-native-currency-input'

export const FormCurrencyInput = ({
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
         <CurrencyInput
            style={commonStyles.formInput}
            value={value || null}
            onChangeValue={text => onChange(name, text)}
            minValue={0}
            delimiter="."
            separator=","
            placeholder="0"
            keyboardType="decimal-pad"
            inputMode="decimal"
         />
      </View>
   )
}
