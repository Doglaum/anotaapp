import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { commonStyles, theme } from '@/theme'
import { router } from 'expo-router'
import { Entypo, MaterialIcons } from '@expo/vector-icons'

const index = () => {
   return (
      <View style={[commonStyles.container, { gap: 15 }]}>
         <TouchableOpacity
            style={[
               commonStyles.addButton,
               { flexDirection: 'row', gap: 10, justifyContent: 'center' }
            ]}
            onPress={() => router.replace('(tabs)/configuration/product')}
         >
            <Text style={commonStyles.addButtonText}>Produtos</Text>
            <Entypo name="shop" size={20} color={theme.colors.white} />
         </TouchableOpacity>
         <TouchableOpacity
            style={[
               commonStyles.addButton,
               { flexDirection: 'row', gap: 10, justifyContent: 'center' }
            ]}
            onPress={() => router.replace('(tabs)/configuration/product-group')}
         >
            <Text style={commonStyles.addButtonText}>Agrupar Produto</Text>
            <Entypo name="list" size={20} color={theme.colors.white} />
         </TouchableOpacity>
         <TouchableOpacity
            style={[
               commonStyles.addButton,
               { flexDirection: 'row', gap: 10, justifyContent: 'center' }
            ]}
            onPress={() => router.replace('(tabs)/configuration/client')}
         >
            <Text style={commonStyles.addButtonText}>Cliente</Text>
            <MaterialIcons name="people" size={20} color={theme.colors.white} />
         </TouchableOpacity>
         <TouchableOpacity
            style={[
               commonStyles.addButton,
               { flexDirection: 'row', gap: 10, justifyContent: 'center' }
            ]}
            onPress={() => router.replace('(tabs)/configuration/printer')}
         >
            <Text style={commonStyles.addButtonText}>Impressora</Text>
            <Entypo name="print" size={20} color={theme.colors.white} />
         </TouchableOpacity>
      </View>
   )
}

export default index
