import { PaperProvider } from 'react-native-paper'
import { Dimensions, Modal, TouchableOpacity, View, Text } from 'react-native'
import { commonStyles, theme } from '@/theme'
import { MaterialIcons } from '@expo/vector-icons'
import { AppToast } from '../AppToast'
import { useEffect, useRef } from 'react'

type OverlayModalProps = {
   children: React.ReactNode
   title: string
   onClose?: () => void
   overlayModalVisible: boolean
}

const OverlayerModal: React.FC<OverlayModalProps> = ({
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
      <Modal animationType="fade" visible={overlayModalVisible} transparent>
         <View
            style={{
               flex: 1,
               alignItems: 'center',
               backgroundColor: '#313131cf'
            }}
         >
            <View
               style={{
                  backgroundColor: theme.colors.appContainerColor,
                  height: height * 0.85,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  width: '100%',
                  borderColor: theme.colors.primary,
                  marginTop: 'auto'
               }}
            >
               <View
                  style={{
                     height: height * 0.08,
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
                     style={[commonStyles.title, { color: theme.colors.white }]}
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
               {children}
            </View>
         </View>
         <AppToast />
      </Modal>
   )
}

export default OverlayerModal
