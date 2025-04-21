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
      error: '#FF3B30',
      delete: "#ff4444",
      edit:"#31e472",
      add:"#0731bb",
      white:"#ffffff",
      whiteGray:"#f2f2f2",
      gray:"#a7a7a7",
    },
};

export const commonStyles = StyleSheet.create({
  listItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flex: 1,
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
    backgroundColor: '#f5f5f5'
 },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    padding: 15,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-end',
    padding: 13,
    borderRadius: 8,
    flexDirection: 'row',
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
    alignItems: 'center',
    marginTop: 16
  },
  editButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
  },
  saveButton: {
    backgroundColor: theme.colors.add,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden'
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
 },
  
});