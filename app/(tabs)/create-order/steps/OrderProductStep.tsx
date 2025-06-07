import {
   View,
   Text,
   StyleSheet,
   FlatList,
   TouchableOpacity,
   Modal,
   Button,
   TextInput,
   ScrollView
} from 'react-native'
import { commonStyles, theme } from '@/theme'
import { useState, useCallback, useEffect } from 'react'
import { Order, Product, OrderProduct, Ingredient } from '@/database/models'
import { ProductService } from '@/services/ProductService'
import { useFocusEffect } from 'expo-router'
import { EmptyList } from '@/components/EmptyList'
import { FormSearchInput, successToast } from '@/components'
import { MaterialIcons } from '@expo/vector-icons'
import CreateOrderProduct from '../components/CreateOrderProduct'
import { List } from 'react-native-paper'

type GroupedProducts = {
   groupId: number
   groupName: string
   products: Product[]
}

const OrderProductStep = ({
   order,
   insertOrderData
}: {
   order: Partial<Order>
   insertOrderData: <K extends keyof Order>(campo: K, valor: Order[K]) => void
}) => {
   const [groupedProducts, setGroupedProducts] = useState<GroupedProducts[]>([])
   const [ungroupedProducts, setUngroupedProducts] = useState<Product[]>([])
   const productService = new ProductService()
   const [products, setProducts] = useState<Product[]>([])
   const [modalVisible, setModalVisible] = useState(false)
   const [selectedProduct, setSelectedProduct] = useState<Product>(
      {} as Product
   )

   const handleOpenModal = (product: Product) => {
      setSelectedProduct(product)
      setModalVisible(true)
   }

   const handleClose = () => {
      setModalVisible(false)
   }

   const handleSave = (ingredients: Ingredient[], details: string) => {
      const orderProduct = new OrderProduct()
      orderProduct.details = details
      orderProduct.product = selectedProduct
      orderProduct.unitPrice = selectedProduct.price
      let ingredientsTotalPrice = ingredients.reduce(
         (total, orderProductIngredient) => {
            const price = orderProductIngredient.price
            return total + price
         },
         0
      )
      orderProduct.totalPrice = selectedProduct.price + ingredientsTotalPrice
      orderProduct.selectedIngredients = ingredients
      insertOrderData('orderProducts', [
         ...(order?.orderProducts || []),
         orderProduct
      ])
      successToast(`${selectedProduct.name} adicionado ao carrinho`)
      setSelectedProduct({} as Product)
      setModalVisible(false)
   }

   useFocusEffect(
      useCallback(() => {
         const loadProdutos = async () => {
            try {
               const products = await productService.listAll()
               setProducts(products)
            } catch (error) {
               console.error('Erro ao carregar produtos:', error)
            }
         }
         loadProdutos()
      }, [])
   )

   useEffect(() => {
      const groupsMap = new Map<number, GroupedProducts>()
      const ungrouped: Product[] = []

      products.forEach(product => {
         if (product.productGroup && product.productGroup.productGroupId) {
            const groupId = product.productGroup.productGroupId
            if (!groupsMap.has(groupId)) {
               groupsMap.set(groupId, {
                  groupId,
                  groupName: product.productGroup.name,
                  products: []
               })
            }
            groupsMap.get(groupId)!.products.push(product)
         } else {
            ungrouped.push(product)
         }
      })

      setGroupedProducts(Array.from(groupsMap.values()))
      setUngroupedProducts(ungrouped)
   }, [products])

   const getProductCount = (productId: number) => {
      return (
         order?.orderProducts?.filter(op => op.product?.productId === productId)
            .length || 0
      )
   }
   return (
      <View style={commonStyles.container}>
         <ScrollView keyboardShouldPersistTaps="handled">
            <List.AccordionGroup>
               {groupedProducts.map(group => (
                  <List.Accordion
                     key={group.groupId}
                     title={group.groupName}
                     id={group.groupId.toString()}
                  >
                     {group.products.map(product => {
                        const count = getProductCount(product.productId)
                        return (
                           <List.Item
                              key={product.productId}
                              title={
                                 count > 0
                                    ? `${product.name}  (x${count})`
                                    : product.name
                              }
                              description={`R$ ${product.price.toFixed(2)}`}
                              onPress={() => handleOpenModal(product)}
                              style={{
                                 paddingLeft: 16,
                                 backgroundColor: theme.colors.white
                              }}
                              titleStyle={{
                                 fontSize: 16,
                                 color: theme.colors.primary
                              }}
                           />
                        )
                     })}
                  </List.Accordion>
               ))}
               {ungroupedProducts.length > 0 &&
                  ungroupedProducts.map(product => {
                     const count = getProductCount(product.productId)
                     return (
                        <List.Item
                           key={product.productId}
                           title={product.name}
                           description={`R$ ${product.price.toFixed(2)}`}
                           onPress={() => handleOpenModal(product)}
                           style={{
                              backgroundColor: theme.colors.white
                           }}
                           titleStyle={{
                              fontSize: 16,
                              color: theme.colors.primary
                           }}
                        />
                     )
                  })}
            </List.AccordionGroup>
         </ScrollView>
         <CreateOrderProduct
            modalVisible={modalVisible}
            onClose={() => handleClose()}
            product={selectedProduct}
            save={handleSave}
         />
      </View>
   )
}
export default OrderProductStep
