import { View, Text } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { commonStyles } from '@/theme'

export const EmptyList = ({
   iconName,
   text
}: {
   iconName: keyof typeof MaterialIcons.glyphMap
   text: string
}) => (
   <View style={commonStyles.emptyContainer}>
      <MaterialIcons name={iconName} size={48} color="#ccc" />
      <Text style={commonStyles.emptyText}>{text}</Text>
   </View>
)
