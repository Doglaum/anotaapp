import {
   View,
   Text,
   StyleSheet,
   TextInput,
   TouchableOpacity,
   ScrollView,
   FlatList
} from 'react-native'
import { useState, useEffect } from 'react'
import { commonStyles, theme } from '@/theme'
import { Cliente, Endereco } from '@/database/models'
import { ClienteService } from '@/services/ClienteService'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { EmptyList } from '@/components/EmptyList'

export default function EnderecoForm() {
   const router = useRouter()
   const clienteService = new ClienteService()
   const [cliente, setCliente] = useState<Partial<Cliente>>({
      nome: '',
      telefone: '',
      enderecos: []
   })

   const handleSubmit = async () => {
      await clienteService.criarCliente(cliente as Cliente)
      console.log('Cliente a ser salvo:', cliente)
      router.back()
   }
   const params = useLocalSearchParams()
   useEffect(() => {
      if (params.endereco) {
         const endereco = params.endereco as Partial<Endereco>
         setCliente(prevState => ({
            ...prevState,
            enderecos: [...(prevState.enderecos || []), endereco as Endereco]
         }))
         console.log(params)
      }
   }, [params])

   return (
      <ScrollView style={styles.container}>
         <View style={styles.formGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
               style={styles.input}
               value={cliente.nome}
               onChangeText={text => setCliente({ ...cliente, nome: text })}
               placeholder="Digite o nome"
            />
         </View>

         <View style={styles.formGroup}>
            <Text style={styles.label}>Telefone</Text>
            <TextInput
               style={styles.input}
               value={cliente.telefone}
               onChangeText={text => setCliente({ ...cliente, telefone: text })}
               placeholder="Digite o telefone"
            />
         </View>
         <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/clientes/endereco/cadastro')}
         >
            <Text style={styles.buttonText}>Cadastrar Endereço</Text>
         </TouchableOpacity>
         {/* <FlatList<Endereco>
            data={cliente.enderecos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
               <View style={commonStyles.listItem}>
                  <View>
                     <Text>
                        {item.bairro} {' - '} {item.rua}
                     </Text>
                  </View>
               </View>
            )}
            ListEmptyComponent={
               <EmptyList iconName="person" text="Nenhum cliente cadastrado" />
            }
         /> */}
         <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Salvar</Text>
         </TouchableOpacity>
      </ScrollView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff'
   },
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
   }
})
