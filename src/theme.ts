import { MD3LightTheme } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors'

export const theme = {
   ...MD3LightTheme,
   colors: {
      ...MD3LightTheme.colors,
      primary: '#007AFF',
      secondary: '#000000',
      background: '#ea1d2c',
      surface: '#ffffff',
      text: '#000000',
      delete: '#ff4444',
      edit: '#26e030',
      add: '#007AFF',
      copy: '#cecece',
      white: '#ffffff',
      whiteGray: '#ececec',
      gray: '#818181',
      success: '#26e030',
      error: '#FF3B30',
      warning: '#dd9748',
      appContainerColor: '#f5f5f5',
      toastBackgroundColor: '#ffffff',
      placeholder: '#818181'
   }
}

export const commonStyles = StyleSheet.create({
   listItem: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 12,
      borderRadius: 8,
      borderWidth: 0.25,
      borderColor: theme.colors.gray,
      marginBottom: 6
   },
   title: {
      fontSize: 20,
      fontWeight: 'bold'
   },
   container: {
      flex: 1,
      paddingTop: 10,
      paddingHorizontal: 10,
      backgroundColor: theme.colors.appContainerColor
   },
   searchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      marginBottom: 16,
      borderRadius: 8,
      borderWidth: 0.3,
      paddingLeft: 10
   },
   addButton: {
      backgroundColor: theme.colors.add,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center'
   },
   smallRemoveButton: {
      backgroundColor: theme.colors.delete,
      padding: 8,
      borderRadius: 8,
      alignItems: 'center'
   },
   smallAddButton: {
      backgroundColor: theme.colors.add,
      padding: 8,
      borderRadius: 8,
      alignItems: 'center'
   },
   smallCopyButton: {
      backgroundColor: theme.colors.copy,
      padding: 8,
      borderRadius: 8,
      alignItems: 'center'
   },
   addButtonText: {
      color: '#fff',
      marginLeft: 8,
      fontWeight: 'bold'
   },
   editButton: {
      backgroundColor: theme.colors.edit,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center'
   },
   editButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
   },
   saveButton: {
      backgroundColor: theme.colors.add,
      padding: 16,
      borderRadius: 12,
      alignItems: 'center'
   },
   saveButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
   },
   emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 32
   },
   emptyText: {
      fontSize: 16,
      color: '#666',
      marginTop: 16
   },
   selectedStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0.2,
      borderRadius: 10,
      backgroundColor: 'white',
      shadowColor: '#000',
      marginTop: 8,
      marginRight: 12,
      paddingHorizontal: 10,
      paddingVertical: 6
   }
})
