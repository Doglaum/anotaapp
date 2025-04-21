import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import { useState } from 'react'
import { commonStyles, theme } from '@/theme'
import { Picker } from '@react-native-picker/picker'
import { FormaPagamento, SituacaoPedido, Pedido } from '@/database/models/'
import { SituacaoPedidoService, FormaPagamentoService } from '@/services'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'

export default function MaisInformacoesStep({
   pedido,
   atualizarPedido
}: {
   pedido: Partial<Pedido>
   atualizarPedido: <K extends keyof Pedido>(campo: K, valor: Pedido[K]) => void
}) {
   const formaPagamentoService = new FormaPagamentoService()
   const [listFormasPagamento, setListFormasPagamento] =
      useState<FormaPagamento[]>()
   const situacaoPedidoService = new SituacaoPedidoService()
   const [listSituacaoPedido, setListSituacaoPedido] =
      useState<SituacaoPedido[]>()

   useFocusEffect(
      useCallback(() => {
         const loadSituacoePedido = async () => {
            try {
               const formas =
                  await formaPagamentoService.listarFormasPagamento()
               setListFormasPagamento(formas)
               const situacoes =
                  await situacaoPedidoService.listarSituacoesPedido()
               setListSituacaoPedido(situacoes)
            } catch (error) {
               console.error('Erro ao carregar formas de pagamento:', error)
            }
         }
         loadSituacoePedido()
         const loadFormasPagamentos = async () => {
            try {
               const formas =
                  await formaPagamentoService.listarFormasPagamento()
               setListFormasPagamento(formas)
               const situacoes =
                  await situacaoPedidoService.listarSituacoesPedido()
               setListSituacaoPedido(situacoes)
            } catch (error) {
               console.error('Erro ao carregar formas de pagamento:', error)
            }
         }
         loadFormasPagamentos()
         return () => {
            console.log('pedido produto step')
         }
      }, [])
   )

   function formaPagamentoHandle(itemValue: FormaPagamento) {
      atualizarPedido('formaPagamento', itemValue)
   }

   function situacaoPedidoHandle(itemValue: SituacaoPedido) {
      atualizarPedido('situacaoPedido', itemValue)
   }

   function trocoHandle(value: number) {
      atualizarPedido('troco', value)
   }

   function taxaFreteHandle(value: number) {
      atualizarPedido('taxaFrete', value)
   }

   function totalPedido(): number {
      let totalPedido = 0
      if (pedido.taxaFrete) {
         totalPedido += pedido.taxaFrete
      }
      if (pedido.pedidoProdutos) {
         totalPedido += pedido.pedidoProdutos.reduce(
            (total, item) => total + item.produto.preco,
            0
         )
      }
      return parseFloat(totalPedido.toFixed(2))
   }

   return (
      <ScrollView style={commonStyles.container}>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Forma de Pagamento</Text>
            <View style={commonStyles.pickerContainer}>
               <Picker
                  selectedValue={pedido.formaPagamento}
                  onValueChange={itemValue => formaPagamentoHandle(itemValue)}
                  style={commonStyles.picker}
               >
                  <Picker.Item label="Selecione" value="" />
                  {listFormasPagamento?.map(formaPagamento => (
                     <Picker.Item
                        key={formaPagamento.id}
                        label={formaPagamento.nome}
                        value={formaPagamento}
                     />
                  ))}
               </Picker>
            </View>
         </View>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Situação Pedido</Text>
            <View style={commonStyles.pickerContainer}>
               <Picker
                  selectedValue={pedido.situacaoPedido}
                  onValueChange={itemValue => situacaoPedidoHandle(itemValue)}
                  style={commonStyles.picker}
               >
                  <Picker.Item label="Selecione" value="" />
                  {listSituacaoPedido?.map(situacaoPedido => (
                     <Picker.Item
                        key={situacaoPedido.id} // Use uma chave única
                        label={situacaoPedido.nome} // Nome da situação do pedido
                        value={situacaoPedido} // Objeto da situação do pedido
                     />
                  ))}
               </Picker>
            </View>
         </View>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Troco</Text>
            <TextInput
               style={commonStyles.input}
               value={pedido.troco?.toString()}
               onChangeText={value => trocoHandle(parseFloat(value) || 0)}
               placeholder="Digite o troco"
               keyboardType="numeric"
            />
         </View>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Taxa Entrega</Text>
            <TextInput
               style={commonStyles.input}
               value={pedido.taxaFrete?.toString()}
               onChangeText={value => taxaFreteHandle(parseFloat(value) || 0)}
               placeholder="Digite a taxa de entrega"
               keyboardType="numeric"
            />
         </View>
         <View style={{ marginTop: 16 }}>
            <Text style={styles.modalTitle}>
               Valor total: R${totalPedido()}
            </Text>
         </View>
      </ScrollView>
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
   textArea: {
      height: 100,
      textAlignVertical: 'top'
   },
   modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16
   }
})
