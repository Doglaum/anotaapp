import { StyleSheet } from "react-native";

const inputCommonsStyles = {
  borderWidth: 2,
  borderRadius: 8,  
  borderColor: '#dfdfdf',
  backgroundColor: '#fff',
}

export const formStyle = StyleSheet.create({
   formGroup: {
     },
     formInput: {
      padding: 8,
       ...inputCommonsStyles
     },
     dropdown: {
      height: 40,
      padding: 8,
      ...inputCommonsStyles
      },
     formLabel: {
       marginLeft: 5,
       marginRight:5,
       fontSize: 12,
       fontWeight: 'bold'
     },
})

