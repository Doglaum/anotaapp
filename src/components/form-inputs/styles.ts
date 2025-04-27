import { StyleSheet } from "react-native";

const inputCommonsStyles = {
  borderWidth: 2,
  borderRadius: 8,  
  borderColor: '#dfdfdf',
  backgroundColor: '#fff',  
  paddingHorizontal: 5,
}

export const formStyle = StyleSheet.create({
   formGroup: {
       height:65
     },
     formInput: {
       flex: 1,
       ...inputCommonsStyles
     },
     dropdown: {
      height: 50,
      ...inputCommonsStyles
      },
     formLabel: {
       marginLeft: 5,
       marginRight:5,
       fontSize: 14,
       fontWeight: 'bold'
     },
})

