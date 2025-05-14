import { View, Text, ScrollView } from 'react-native'
import { Order } from '@/database/models'
import { StyleSheet } from 'react-native'
import { theme } from '@/theme'

const OrderInformation = ({ order }: { order: Partial<Order> }) => {
   return (
      <ScrollView style={[commonStyles.container, { overflow: 'hidden' }]}>
         <View>
            <View style={commonStyles.section}>
               <Text style={commonStyles.title}>Dados do cliente</Text>
               <View>
                  <Text style={commonStyles.text}>
                     <Text style={commonStyles.highlightedText}>
                        Nome do cliente:{' '}
                     </Text>
                     {order.clientName}
                  </Text>
                  <Text style={commonStyles.text}>
                     <Text style={commonStyles.highlightedText}>
                        Telefone:{' '}
                     </Text>
                     {order.client?.phoneNumber}
                  </Text>
               </View>
            </View>

            <View style={commonStyles.section}>
               <Text style={commonStyles.title}>Produtos</Text>
               {order?.orderProducts?.map((item, index) => (
                  <View key={index} style={commonStyles.productContainer}>
                     <Text style={commonStyles.text}>
                        <Text style={commonStyles.highlightedText}>Nome: </Text>
                        {item.product.name}
                     </Text>
                     <Text style={commonStyles.text}>
                        <Text style={commonStyles.highlightedText}>
                           Preço:{' '}
                        </Text>
                        R${item.unitPrice.toFixed(2)}
                     </Text>
                     {item.details ? (
                        <Text style={commonStyles.text}>
                           <Text style={commonStyles.highlightedText}>
                              Detalhes:{' '}
                           </Text>
                           {item.details}
                        </Text>
                     ) : null}
                     {item.selectedIngredients?.map(
                        (ingredient, ingredientIndex) => (
                           <View
                              key={ingredientIndex}
                              style={[
                                 commonStyles.ingredientContainer,
                                 {
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    borderTopWidth: 0.3
                                 }
                              ]}
                           >
                              <Text style={commonStyles.ingredientText}>
                                 {ingredient.name}
                              </Text>
                              {ingredient.price ? (
                                 <Text style={commonStyles.ingredientText}>
                                    R${ingredient.price.toFixed(2)}
                                 </Text>
                              ) : null}
                           </View>
                        )
                     )}
                     {item.unitPrice != item.totalPrice ? (
                        <Text style={[commonStyles.text, { marginTop: 8 }]}>
                           <Text style={commonStyles.ingredientText}>
                              Preço total:{' '}
                           </Text>
                           R${item.totalPrice.toFixed(2)}
                        </Text>
                     ) : null}
                  </View>
               ))}
            </View>

            <View style={commonStyles.section}>
               <Text style={commonStyles.title}>Pagamento</Text>
               <View>
                  <Text style={[commonStyles.title, { color: 'red' }]}>
                     {order.paymentStatus?.name.toUpperCase()}
                  </Text>
                  <Text style={commonStyles.text}>
                     <Text style={commonStyles.highlightedText}>
                        Forme de pagamento:{' '}
                     </Text>
                     {order.paymentMethod?.name}
                  </Text>
                  <Text style={commonStyles.text}>
                     <Text style={commonStyles.highlightedText}>Troco: </Text>
                     R${order.changeFor?.toFixed(2)}
                  </Text>
                  <Text style={commonStyles.text}>
                     <Text style={commonStyles.highlightedText}>
                        Taxa de entrega:{' '}
                     </Text>
                     R${order.deliveryFee?.toFixed(2)}
                  </Text>
                  <Text style={commonStyles.text}>
                     <Text style={commonStyles.highlightedText}>
                        Valor total do pedido:{' '}
                     </Text>
                     R${order.totalPrice?.toFixed(2)}
                  </Text>
               </View>
            </View>

            {order.address ? (
               <View style={commonStyles.section}>
                  <Text style={commonStyles.title}>Dados do endereço</Text>
                  <View>
                     <Text style={commonStyles.text}>
                        <Text style={commonStyles.highlightedText}>
                           Bairro:{' '}
                        </Text>
                        {order.address?.neighborhood}
                     </Text>
                     <Text style={commonStyles.text}>
                        <Text style={commonStyles.highlightedText}>
                           Número:{' '}
                        </Text>
                        {order.address?.number}
                     </Text>
                     <Text style={commonStyles.text}>
                        <Text style={commonStyles.highlightedText}>
                           Complemento:{' '}
                        </Text>
                        {order.address?.complement}
                     </Text>
                     <Text style={commonStyles.text}>
                        <Text style={commonStyles.highlightedText}>CEP: </Text>
                        {order.address?.zipCode}
                     </Text>
                     <Text style={commonStyles.text}>
                        <Text style={commonStyles.highlightedText}>
                           Cidade:{' '}
                        </Text>
                        {order.address?.city}
                     </Text>
                  </View>
               </View>
            ) : null}
         </View>
      </ScrollView>
   )
}

const commonStyles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.appContainerColor,
      overflow: 'visible'
   },
   section: {
      marginBottom: 16,
      padding: 16,
      backgroundColor: '#ffffff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3
   },
   title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 8
   },
   text: {
      fontSize: 16,
      color: '#555',
      marginBottom: 4
   },
   highlightedText: {
      fontWeight: 'bold',
      color: '#000'
   },
   productContainer: {
      marginBottom: 12,
      borderBottomWidth: 0.8
   },
   ingredientContainer: {
      marginLeft: 8,
      marginRight: 8,
      padding: 2
   },
   ingredientText: {
      fontWeight: '300',
      fontSize: 14,
      color: '#000'
   }
})

export default OrderInformation
