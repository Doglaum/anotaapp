import * as React from 'react'
import { Portal, PaperProvider } from 'react-native-paper'
import {
   Dimensions,
   Modal,
   TouchableOpacity,
   TouchableWithoutFeedback,
   View,
   Text
} from 'react-native'
import { commonStyles, theme } from '@/theme'
import { MaterialIcons } from '@expo/vector-icons'

type OverlayModalProps = {
   children: React.ReactNode
   title: string
}

export const OverlayerModal: React.FC<OverlayModalProps> = ({
   children,
   title
}) => {
   const [visible, setVisible] = React.useState(false)
   const { height } = Dimensions.get('window')

   return (
      <View>
         <PaperProvider>
            <Portal>
               <Modal
                  animationType="fade"
                  visible={visible}
                  onDismiss={() => setVisible(false)}
                  transparent
               >
                  <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                     <View
                        style={{
                           flex: 1,
                           justifyContent: 'center',
                           alignItems: 'center',
                           backgroundColor: '#313131cf'
                        }}
                     >
                        <TouchableWithoutFeedback>
                           <View
                              style={{
                                 backgroundColor:
                                    theme.colors.appContainerColor,
                                 height: height * 0.8,
                                 width: '90%',
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
                                    onPress={() => setVisible(false)}
                                 >
                                    <MaterialIcons
                                       name="close"
                                       size={26}
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
                        </TouchableWithoutFeedback>
                     </View>
                  </TouchableWithoutFeedback>
               </Modal>
            </Portal>
         </PaperProvider>
         <TouchableOpacity
            style={commonStyles.addButton}
            onPress={() => setVisible(true)}
         >
            <MaterialIcons name="add" size={24} color="#fff" />
         </TouchableOpacity>
      </View>
   )
}
