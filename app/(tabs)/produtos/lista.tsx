import {
   View,
   Text,
   StyleSheet,
   FlatList,
   TouchableOpacity,
   TextInput
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { commonStyles, theme } from '@/theme'
import { useRouter } from 'expo-router'
import { useState, useEffect, useCallback } from 'react'
import { Produto } from '@/database/models/Produto'
import { ProdutoService } from '@/services/ProdutoService'
import { useFocusEffect } from 'expo-router'
import { EmptyList } from '@/components/EmptyList'

export default function Lista() {
   const router = useRouter()
   const [produtos, setProdutos] = useState<Produto[]>([])
   const [filteredProdutos, setFilteredProdutos] = useState<Produto[]>([])
   const produtoService = new ProdutoService()

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
            console.log('Saindo da aba Pedidos')
         }
      }, [])
   )

   const handleDelete = async (id: number) => {
      await produtoService.excluirProduto(id)
      const newList = produtos.filter(p => p.id !== id)
      setProdutos(() => newList)
      setFilteredProdutos(() => newList)
   }

   const handleSearch = (text: string) => {
      const searchText = text.toLowerCase().trim()
      const filtered = produtos.filter(produto => {
         const nome = produto.nome?.toLowerCase() || ''
         return nome.includes(searchText)
      })
      setFilteredProdutos(filtered)
   }

   return (
      <View style={commonStyles.container}>
         <View style={commonStyles.searchContainer}>
            <TextInput
               style={commonStyles.input}
               placeholder="Pesquisar produto"
               onChangeText={handleSearch}
            />
            <TouchableOpacity
               style={commonStyles.addButton}
               onPress={() => router.push('/produtos/cadastro')}
            >
               <MaterialIcons name="add" size={24} color="#fff" />
            </TouchableOpacity>
         </View>
         <FlatList<Produto>
            data={filteredProdutos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
               <View style={commonStyles.listItem}>
                  <View>
                     <Text style={styles.productName}>{item.nome}</Text>
                     <Text style={styles.productPrice}>
                        R$ {item.preco.toFixed(2)}
                     </Text>
                  </View>
                  <View style={styles.productActions}>
                     <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => router.push(`/produtos/${item.id}`)}
                     >
                        <MaterialIcons
                           name="edit"
                           size={24}
                           color={theme.colors.edit}
                        />
                     </TouchableOpacity>
                     <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleDelete(item.id)}
                     >
                        <MaterialIcons
                           name="delete"
                           size={24}
                           color={theme.colors.delete}
                        />
                     </TouchableOpacity>
                  </View>
               </View>
            )}
            ListEmptyComponent={
               <EmptyList
                  iconName="restaurant"
                  text="Nenhum produto cadastrado"
               />
            }
         />
      </View>
   )
}

const styles = StyleSheet.create({
   productName: {
      fontSize: 16,
      fontWeight: 'bold'
   },
   productPrice: {
      fontSize: 14,
      color: '#666',
      marginTop: 4
   },
   productActions: {
      flexDirection: 'row'
   },
   actionButton: {
      marginLeft: 16
   }
})
