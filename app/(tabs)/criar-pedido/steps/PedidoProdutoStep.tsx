import {
   View,
   Text,
   StyleSheet,
   FlatList,
   TouchableOpacity,
   Modal,
   Button,
   TextInput
} from 'react-native'
import { commonStyles } from '@/theme'
import { useState, useCallback } from 'react'
import { Pedido, Produto, PedidoProduto } from '@/database/models'
import { ProdutoService } from '@/services/ProdutoService'
import { useFocusEffect } from '@react-navigation/native'
import { EmptyList } from '@/components/EmptyList'

export const PedidoProdutoStep = ({
   pedido,
   atualizarPedido
}: {
   pedido: Partial<Pedido>
   atualizarPedido: <K extends keyof Pedido>(campo: K, valor: Pedido[K]) => void
}) => {
   const produtoService = new ProdutoService()
   const [produtos, setProdutos] = useState<Produto[]>([])
   const [modalVisible, setModalVisible] = useState(false)
   const [detalhe, setDetalhe] = useState('')
   const [produtoSelecionado, setProdutoSelecionado] = useState<Produto>(
      {} as Produto
   )
   const [filteredProdutos, setFilteredProdutos] = useState<Produto[]>([])

   const handleOpenModal = (produto: Produto) => {
      setProdutoSelecionado(produto)
      setModalVisible(true)
   }

   const handleSave = () => {
      const pedidoProduto = new PedidoProduto()
      pedidoProduto.detalhes = detalhe
      pedidoProduto.produto = produtoSelecionado
      pedidoProduto.valorUnitario = produtoSelecionado.preco
      atualizarPedido('pedidoProdutos', [
         ...(pedido?.pedidoProdutos || []),
         pedidoProduto
      ])
      atualizarPedido('valorTotal', totalPedido())
      setProdutoSelecionado({} as Produto)
      setDetalhe('')
      setModalVisible(false)
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

   useFocusEffect(
      useCallback(() => {
         const loadProdutos = async () => {
            try {
               const produtos = await produtoService.listarProdutos()
               setProdutos(produtos)
               setFilteredProdutos(produtos)
            } catch (error) {
               console.error('Erro ao carregar produtos:', error)
            }
         }
         loadProdutos()
         return () => {
            console.log('pedido produto step')
         }
      }, [])
   )

   return (
      <View style={commonStyles.container}>
         <View style={commonStyles.searchContainer}>
            <TextInput
               style={commonStyles.input}
               placeholder="Pesquisar produto"
               onChangeText={text => {
                  const filteredProdutos = produtos.filter(produto =>
                     produto.nome.toLowerCase().includes(text.toLowerCase())
                  )
                  setFilteredProdutos(filteredProdutos)
               }}
            />
         </View>
         <FlatList<Produto>
            data={filteredProdutos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
               <TouchableOpacity onPress={() => handleOpenModal(item)}>
                  <View style={commonStyles.listItem}>
                     <View style={styles.productInfo}>
                        <Text style={styles.productName}>{item.nome}</Text>
                        <View>
                           <Text style={styles.productPrice}>
                              R$ {item.preco.toFixed(2)}
                           </Text>
                        </View>
                     </View>
                  </View>
               </TouchableOpacity>
            )}
            ListEmptyComponent={
               <EmptyList
                  iconName="restaurant"
                  text="Nenhum produto cadastrado"
               />
            }
         />
         <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
         >
            <View style={styles.modalContainer}>
               <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Adicionar Detalhes</Text>
                  <TextInput
                     style={styles.input}
                     placeholder="Detalhes"
                     onChangeText={setDetalhe}
                  />
                  <View style={styles.modalActions}>
                     <Button
                        title="Cancelar"
                        onPress={() => setModalVisible(false)}
                     />
                     <Button title="Salvar" onPress={handleSave} />
                  </View>
               </View>
            </View>
         </Modal>
      </View>
   )
}

const styles = StyleSheet.create({
   productInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1
   },
   productName: {
      fontSize: 16,
      fontWeight: 'bold'
   },
   productPrice: {
      fontSize: 14,
      color: '#666',
      marginTop: 4
   },
   modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
   },
   modalContent: {
      width: '80%',
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      elevation: 5
   },
   modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16
   },
   input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      marginBottom: 16
   },
   modalActions: {
      flexDirection: 'row',
      justifyContent: 'space-between'
   }
})
