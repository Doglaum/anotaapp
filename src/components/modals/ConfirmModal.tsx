import React, { useState, useCallback } from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { theme } from '@/theme'

type ConfirmModalProps = {
   visible: boolean
   message: string
   onSelect: (result: boolean) => void
}

const ConfirmModal = ({ visible, message, onSelect }: ConfirmModalProps) => (
   <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => onSelect(false)}
   >
      <View style={styles.modalContainer}>
         <View style={styles.modalContent}>
            <Text style={styles.title}>Atenção!</Text>
            <Text style={styles.message}>{message}</Text>
            <View style={styles.actions}>
               <TouchableOpacity
                  style={[
                     styles.button,
                     { backgroundColor: theme.colors.delete }
                  ]}
                  onPress={() => onSelect(false)}
               >
                  <Text style={styles.buttonText}>Não</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={[
                     styles.button,
                     { backgroundColor: theme.colors.primary }
                  ]}
                  onPress={() => onSelect(true)}
               >
                  <Text style={styles.buttonText}>Sim</Text>
               </TouchableOpacity>
            </View>
         </View>
      </View>
   </Modal>
)

export function useConfirmModal() {
   const [visible, setVisible] = useState(false)
   const [message, setMessage] = useState('')
   const [resolver, setResolver] = useState<((result: boolean) => void) | null>(
      null
   )

   const confirm = useCallback((msg: string) => {
      setMessage(msg)
      setVisible(true)
      return new Promise<boolean>(resolve => {
         setResolver(() => resolve)
      })
   }, [])

   const handleSelect = (result: boolean) => {
      setVisible(false)
      resolver?.(result)
   }

   const Confirm = (
      <ConfirmModal
         visible={visible}
         message={message}
         onSelect={handleSelect}
      />
   )

   return { confirm, Confirm }
}

const styles = StyleSheet.create({
   modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)'
   },
   modalContent: {
      width: '80%',
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 20,
      alignItems: 'center'
   },
   title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 16
   },
   message: {
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 24
   },
   actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%'
   },
   button: {
      flex: 1,
      marginHorizontal: 8,
      paddingVertical: 12,
      borderRadius: 6,
      alignItems: 'center'
   },
   buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16
   }
})
