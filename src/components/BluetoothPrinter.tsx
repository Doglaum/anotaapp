// import React, { useState, useEffect } from 'react'
// import { View, Text, Button, FlatList, StyleSheet } from 'react-native'
// import RNBluetoothClassic, {
//    BluetoothDevice
// } from 'react-native-bluetooth-classic'
// const App = () => {
//    const [devices, setDevices] = useState<BluetoothDevice[]>([]) // Lista de dispositivos emparelhados
//    const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice>(
//       {} as BluetoothDevice
//    ) // Dispositivo conectado
//    const [isScanning, setIsScanning] = useState(false) // Status de escaneamento

//    // Escanear dispositivos emparelhados
//    const listPairedDevices = async () => {
//       try {
//          const pairedDevices = await RNBluetoothClassic.getBondedDevices()
//          setDevices(pairedDevices)
//          console.log('Dispositivos emparelhados:', pairedDevices)
//       } catch (error) {
//          console.error('Erro ao listar dispositivos emparelhados:', error)
//       }
//    }

//    // Conectar a um dispositivo
//    const connectToDevice = async (device: BluetoothDevice) => {
//       try {
//          const connection = await RNBluetoothClassic.connectToDevice(device.id)
//          setConnectedDevice(device)
//          console.log(`Conectado a ${device.name}`)
//       } catch (error) {
//          console.error('Erro ao conectar ao dispositivo:', error)
//       }
//    }

//    // Enviar texto para impressão
//    const printText = async () => {
//       if (!connectedDevice) {
//          console.error('Nenhum dispositivo conectado')
//          return
//       }

//       try {
//          const text = 'Olá, mundo!\nImpressão de teste via React Native.\n\n'
//          await connectedDevice.write(text) // Envia o texto para a impressora
//          console.log('Texto enviado para impressão')
//       } catch (error) {
//          console.error('Erro ao imprimir:', error)
//       }
//    }

//    // Desconectar do dispositivo
//    const disconnectDevice = async () => {
//       if (!connectedDevice) return

//       try {
//          await connectedDevice.disconnect()
//          setConnectedDevice({} as BluetoothDevice)
//          console.log('Desconectado do dispositivo')
//       } catch (error) {
//          console.error('Erro ao desconectar:', error)
//       }
//    }

//    useEffect(() => {
//       // Listar dispositivos emparelhados ao carregar o componente
//       listPairedDevices()

//       return () => {
//          // Desconectar ao desmontar o componente
//          if (connectedDevice) {
//             disconnectDevice()
//          }
//       }
//    }, [])

//    return (
//       <View style={styles.container}>
//          <Button
//             title="Listar Dispositivos Emparelhados"
//             onPress={listPairedDevices}
//          />
//          <FlatList
//             data={devices}
//             keyExtractor={item => item.id}
//             renderItem={({ item }) => (
//                <Button
//                   title={`Conectar a ${item.name}`}
//                   onPress={() => connectToDevice(item)}
//                />
//             )}
//          />
//          {connectedDevice && (
//             <View>
//                <Text>Conectado a: {connectedDevice.name}</Text>
//                <Button title="Imprimir Texto" onPress={printText} />
//                <Button title="Desconectar" onPress={disconnectDevice} />
//             </View>
//          )}
//       </View>
//    )
// }

// const styles = StyleSheet.create({
//    container: {
//       flex: 1,
//       padding: 20,
//       justifyContent: 'center'
//    }
// })

// export default App
