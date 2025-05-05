import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Portal, PaperProvider } from 'react-native-paper'
import {
   Dimensions,
   Modal,
   TouchableOpacity,
   TouchableWithoutFeedback,
   View,
   Text,
   StyleProp,
   ViewStyle,
   Keyboard,
   KeyboardAvoidingView,
   Platform
} from 'react-native'
import { commonStyles, theme } from '@/theme'
import { MaterialIcons } from '@expo/vector-icons'

type OverlayModalProps = {
   children: React.ReactNode
   title: string
   onClose?: () => void
   overlayModalVisible: boolean
}

export const OverlayerModal: React.FC<OverlayModalProps> = ({
   children,
   title,
   onClose,
   overlayModalVisible
}) => {
   const { height } = Dimensions.get('window')
   const [visible, setVisible] = useState(false)

   const handleClose = () => {
      setVisible(false)
      if (onClose) {
         console.log('onclose')
         onClose()
      }
   }

   return (
      <View>
         <PaperProvider>
            <Modal
               animationType="slide"
               visible={overlayModalVisible}
               transparent
            >
               <View
                  style={{
                     flex: 1,
                     justifyContent: 'flex-end',
                     alignItems: 'center',
                     backgroundColor: '#313131cf'
                  }}
               >
                  <View
                     style={{
                        backgroundColor: theme.colors.appContainerColor,
                        height: height * 0.9,
                        width: '100%',
                        borderRadius: 15,
                        borderColor: theme.colors.primary
                     }}
                  >
                     <View
                        style={{
                           height: height * 0.06,
                           flexDirection: 'row',
                           justifyContent: 'space-between',
                           alignItems: 'center',
                           borderBottomColor: '#ddd',
                           backgroundColor: theme.colors.primary,
                           borderTopLeftRadius: 15,
                           borderTopRightRadius: 15,
                           padding: 10
                        }}
                     >
                        <Text
                           style={[
                              commonStyles.title,
                              { color: theme.colors.white }
                           ]}
                        >
                           {title}
                        </Text>
                        <TouchableOpacity onPress={handleClose}>
                           <MaterialIcons
                              name="close"
                              size={26}
                              color={theme.colors.white}
                           />
                        </TouchableOpacity>
                     </View>
                     <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        style={commonStyles.container}
                     >
                        <TouchableWithoutFeedback
                           onPress={() => Keyboard.dismiss()}
                        >
                           <View
                              style={{
                                 flex: 1,
                                 paddingVertical: 16,
                                 paddingHorizontal: 10
                              }}
                           >
                              {children}
                           </View>
                        </TouchableWithoutFeedback>
                     </KeyboardAvoidingView>
                  </View>
               </View>
            </Modal>
         </PaperProvider>
      </View>
   )
}
