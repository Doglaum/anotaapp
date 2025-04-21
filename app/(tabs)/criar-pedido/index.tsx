import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'
import { useState } from 'react'
import { commonStyles, theme } from '@/theme'
import { Pedido } from '@models/index'
import { PedidoService } from '@/services/PedidoService'
import { useRouter, Stack } from 'expo-router'
import { ClienteStep, PedidoProdutoStep, MaisInformacoesStep } from './steps'
import Carrinho from './components/Carrinho'
import { MaterialIcons } from '@expo/vector-icons'

export default function PedidoForm() {
   const router = useRouter()
   const pedidoService = new PedidoService()
   const [pedido, setPedido] = useState<Partial<Pedido>>({})
   const atualizarPedido = <K extends keyof Pedido>(
      campo: K,
      valor: Pedido[K]
   ) => {
      setPedido(prev => ({ ...prev, [campo]: valor }))
   }
   const [step, setStep] = useState(1)
   const handleNextStep = () => {
      if (step === 1 && !pedido.cliente) {
         Alert.alert('Selecione um cliente')
         return
      } else if (step === 2 && pedido?.pedidoProdutos?.length === 0) {
         Alert.alert('Adicione pelo menos um produto ao pedido')
         return
      } else if (step === 3) return
      setStep(step + 1)
   }
   const handlePreviousStep = () => {
      if (step === 1) return
      setStep(step - 1)
   }

   const [modalVisible, setModalVisible] = useState(false)

   //TODO : adicionar forma de somar o valor do frete
   const handleSubmit = async () => {
      await pedidoService.criarPedido(pedido)
      setPedido({})
      setStep(1)
      router.push('/pedidos/lista')
   }

   return (
      <View style={commonStyles.container}>
         <Stack.Screen
            options={{
               title:
                  step === 1
                     ? 'Selecionar Cliente'
                     : step === 2
                     ? 'Selecionar Produto'
                     : 'Mais Informações',
               headerStyle: {
                  backgroundColor: theme.colors.primary
               },
               headerTintColor: theme.colors.white
            }}
         />
         <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
         >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               {[1, 2, 3].map(num => (
                  <View
                     key={num}
                     style={[
                        styles.stepBox,
                        step === num && styles.activeStepBox
                     ]}
                  >
                     <Text
                        style={[
                           styles.stepText,
                           step === num && styles.activeStepText
                        ]}
                     >
                        {num}
                     </Text>
                  </View>
               ))}
            </View>
            <TouchableOpacity
               style={styles.cartButton}
               onPress={() => setModalVisible(true)}
            >
               <MaterialIcons name="shopping-cart" size={24} color="#fff" />
               <Text style={styles.cartButtonText}>Carrinho</Text>
            </TouchableOpacity>
         </View>
         {step === 1 && (
            <ClienteStep pedido={pedido} atualizarPedido={atualizarPedido} />
         )}
         {step === 2 && (
            <PedidoProdutoStep
               pedido={pedido}
               atualizarPedido={atualizarPedido}
            />
         )}
         {step === 3 && (
            <MaisInformacoesStep
               pedido={pedido}
               atualizarPedido={atualizarPedido}
            />
         )}
         <View
            style={{
               flexDirection: 'row',
               justifyContent: 'space-around'
            }}
         >
            <View>
               <TouchableOpacity
                  style={[
                     styles.roundedButton,
                     { opacity: step === 1 ? 0 : 1 }
                  ]}
                  onPress={handlePreviousStep}
               >
                  <MaterialIcons name="arrow-back" size={24} color="#fff" />
               </TouchableOpacity>
            </View>
            <View>
               {step < 3 && (
                  <TouchableOpacity
                     style={styles.roundedButton}
                     onPress={handleNextStep}
                  >
                     <MaterialIcons
                        name="arrow-forward"
                        size={24}
                        color="#fff"
                     />
                  </TouchableOpacity>
               )}
               {step === 3 && (
                  <TouchableOpacity
                     style={styles.roundedButton}
                     onPress={handleSubmit}
                  >
                     <MaterialIcons name="check" size={24} color="#fff" />
                  </TouchableOpacity>
               )}
            </View>
         </View>
         <Carrinho
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            pedido={pedido}
            atualizarPedido={atualizarPedido}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   formGroup: {
      marginBottom: 16
   },
   label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
      color: theme.colors.text
   },
   input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: '#fff'
   },
   textArea: {
      height: 100,
      textAlignVertical: 'top'
   },
   button: {
      backgroundColor: theme.colors.primary,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16
   },
   buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
   },
   cartButton: {
      backgroundColor: theme.colors.primary,
      alignSelf: 'flex-end',
      padding: 10,
      borderRadius: 30,
      flexDirection: 'row',
      alignItems: 'center'
   },
   cartButtonText: {
      color: '#fff',
      marginLeft: 8,
      fontWeight: 'bold'
   },
   roundedButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 25,
      alignItems: 'center'
   },
   roundedButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
   },
   stepBox: {
      width: 40,
      height: 40,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5,
      backgroundColor: '#ffffff'
   },
   activeStepBox: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary
   },
   stepText: {
      fontSize: 16,
      color: '#000'
   },
   activeStepText: {
      color: '#fff'
   }
})
