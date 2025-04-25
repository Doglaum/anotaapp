import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { MultiSelect } from 'react-native-element-dropdown'
import { commonStyles, theme } from '../theme'
import { Ingredient } from '@/database/models'
import { MaterialIcons } from '@expo/vector-icons'

type MultiSelectType = {
   value: string[]
   key: string
   data: any[]
   labelField: string
   valueField: string
   placeholder: string
   setIngredients: (item: any) => void
}

export const MultiSelectInput = ({
   value,
   key,
   data,
   labelField,
   setIngredients,
   placeholder,
   valueField
}: MultiSelectType) => {
   return (
      <View
         style={{ flex: 1, backgroundColor: theme.colors.appContainerColor }}
      >
         <MultiSelect
            key={key}
            style={[commonStyles.input, { flex: 1 }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={data}
            labelField={labelField}
            valueField={valueField}
            placeholder={placeholder}
            value={value}
            search
            searchPlaceholder="Procurar..."
            onChange={setIngredients}
            renderItem={item => (
               <View style={styles.item}>
                  <Text style={styles.selectedTextStyle}>
                     {item[labelField]}
                  </Text>
               </View>
            )}
            renderSelectedItem={(item, unSelect) => (
               <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                  <View style={styles.selectedStyle}>
                     <Text style={styles.textSelectedStyle}>
                        {item[labelField]}
                     </Text>
                     <MaterialIcons
                        name="delete"
                        size={24}
                        color={theme.colors.delete}
                     />
                  </View>
               </TouchableOpacity>
            )}
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
      flex: 1,
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
