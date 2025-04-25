import { MD3LightTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export const theme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#007AFF',
      secondary: '#000000',
      background: '#ea1d2c',
      surface: '#ffffff',
      text: '#000000',
      delete: "#ff4444",
      edit: "#26e030",
      add: "#007AFF",
      white:"#ffffff",
      whiteGray:"#f2f2f2",
      gray:"#a7a7a7",
      success: "#26e030",
      error: '#FF3B30',
      warning: '#dd9748',
      appContainerColor: '#f5f5f5',
      toastBackgroundColor: '#ffffff'
    },
};

export const commonStyles = StyleSheet.create({
  listItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 0.2,
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    paddingVertical: 16,
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
    paddingLeft:10
  },
  formGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 0.2,
    paddingLeft:10
    
  },
  formInput: {
    flex: 1,
    borderWidth: 0.2,
    borderLeftWidth:0,
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  formLabel: {
    marginLeft: 5,
    marginRight:5,
    fontSize: 14,
    fontWeight: 'bold'
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    padding: 9,
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
    borderRadius: 12,
    alignItems: 'center',
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
    alignItems: 'center',
    
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
    paddingVertical: 6,
 }
});