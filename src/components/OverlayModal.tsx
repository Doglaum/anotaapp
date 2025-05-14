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
   Platform,
   SafeAreaView
} from 'react-native'
import { commonStyles, theme } from '@/theme'
import { MaterialIcons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import { AppToast } from './AppToast'

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

   const handleClose = () => {
      if (onClose) {
         onClose()
      }
   }

   return (
      <View>
         <PaperProvider>
            <Modal
               animationType="fade"
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
                        height: height * 0.85,
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
                        <TouchableOpacity
                           onPress={handleClose}
                           style={{ padding: 5 }}
                        >
                           <MaterialIcons
                              name="close"
                              size={20}
                              color={theme.colors.white}
                           />
                        </TouchableOpacity>
                     </View>

                     <View
                        style={{
                           flex: 1,
                           paddingVertical: 16,
                           paddingHorizontal: 10
                        }}
                     >
                        {children}
                     </View>
                  </View>
               </View>
               <AppToast />
            </Modal>
         </PaperProvider>
      </View>
   )
}
