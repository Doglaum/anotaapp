import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { commonStyles, theme } from '@/theme'
import { FormaPagamento, SituacaoPedido, Pedido } from '@/database/models/'
import { SituacaoPedidoService, FormaPagamentoService } from '@/services'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import CurrencyInput from 'react-native-currency-input'
import { SelectInput } from '@/components'

export const MaisInformacoesStep = ({
   pedido,
   atualizarPedido
}: {
   pedido: Partial<Pedido>
   atualizarPedido: <K extends keyof Pedido>(campo: K, valor: Pedido[K]) => void
}) => {
   const formaPagamentoService = new FormaPagamentoService()
   const [listFormasPagamento, setListFormasPagamento] =
      useState<FormaPagamento[]>()
   const situacaoPedidoService = new SituacaoPedidoService()
   const [listSituacaoPedido, setListSituacaoPedido] =
      useState<SituacaoPedido[]>()
   const [frete, setFrete] = useState<number>(0)

   useFocusEffect(
      useCallback(() => {
         const loadSelectData = async () => {
            try {
               const formas = await formaPagamentoService.listar()
               setListFormasPagamento(formas)
               const situacoes = await situacaoPedidoService.listar()
               setListSituacaoPedido(situacoes)
            } catch (error) {
               console.error('Erro ao carregar formas de pagamento:', error)
            }
         }
         loadSelectData()
         return () => {
            console.log('pedido produto step')
         }
      }, [])
   )

   async function formaPagamentoHandle(itemValue: FormaPagamento) {
      if (itemValue) {
         atualizarPedido('formaPagamento', itemValue)
      }
   }

   async function situacaoPedidoHandle(itemValue: SituacaoPedido) {
      if (itemValue) {
         atualizarPedido('situacaoPedido', itemValue)
      }
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

   useEffect(() => {
      const total = totalPedido()
      atualizarPedido('valorTotal', total)
   }, [pedido.taxaFrete, pedido.pedidoProdutos])

   return (
      <ScrollView style={commonStyles.container}>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Forma de Pagamento</Text>
            <SelectInput
               data={listFormasPagamento || []}
               labelField="nome"
               valueField="id"
               placeholder="Selecione a forma de pagamento"
               onChange={formaPagamentoHandle}
            />
         </View>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Situação Pedido</Text>
            <SelectInput
               data={listSituacaoPedido || []}
               labelField="nome"
               valueField="id"
               placeholder="Selecione a situação do pedido"
               onChange={situacaoPedidoHandle}
            />
         </View>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Troco</Text>
            <CurrencyInput
               style={commonStyles.input}
               value={pedido.troco || 0.0}
               onChangeValue={trocoHandle}
               placeholder="Digite o troco"
               keyboardType="numeric"
               minValue={0}
               delimiter="."
               separator=","
               inputMode="decimal"
            />
         </View>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Taxa Entrega</Text>
            <CurrencyInput
               style={commonStyles.input}
               value={pedido.taxaFrete || 0}
               onChangeValue={taxaFreteHandle}
               placeholder="Digite a taxa de entrega"
               keyboardType="numeric"
               minValue={0}
               delimiter="."
               separator=","
               inputMode="decimal"
            />
         </View>
         <View style={{ marginTop: 16 }}>
            <Text style={styles.modalTitle}>
               Valor total: R${pedido.valorTotal?.toFixed(2)}
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
   modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16
   }
})
