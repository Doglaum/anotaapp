import { errorToast } from '@/components'
import { Order } from '@/database/models'
import { SystemParamsService } from '@/services'
import dayjs from 'dayjs'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { DeviceEventEmitter } from 'react-native'

import {
   BluetoothManager,
   BluetoothEscposPrinter,
   BluetoothDevice,
   ALIGN
} from 'tp-react-native-bluetooth-printer'

type FoundedDevicesType = {
   paired: BluetoothDevice[]
   found: BluetoothDevice[]
}

type PrinterContextType = {
   connectToPrinter: (printer: BluetoothDevice) => Promise<void>
   print: (order: Order) => Promise<void>
   scanDevices: () => void
   isDiscovering: boolean
   devices: FoundedDevicesType
   connectedPrinter: BluetoothDevice | undefined
   isPrinting: boolean
}

const PrinterContext = createContext<PrinterContextType | undefined>(undefined)

export const PrinterProvider: React.FC<{ children: React.ReactNode }> = ({
   children
}) => {
   const systemParamsService = new SystemParamsService()
   const [isPrinting, setIsPrinting] = useState(false)
   const [connectedPrinter, setConnectedPrinter] = useState<BluetoothDevice>()
   const [devices, setDevices] = useState<FoundedDevicesType>(
      {} as FoundedDevicesType
   )
   const [isDiscovering, setIsDisconvering] = useState(false)

   const scanDevices = async () => {
      try {
         const isBluetoothEnabled = await BluetoothManager.isBluetoothEnabled()
         if (!isBluetoothEnabled) {
            errorToast('É necessário ligar o bluetooth para continuar')
            return
         }
         setIsDisconvering(true)
         const devices = await BluetoothManager.scanDevices()
         const objectDevices = JSON.parse(devices.toString())
         if (objectDevices?.paired[0]?.address) {
            connectToPrinter(objectDevices.paired[0])
         }
         setDevices(objectDevices)
      } catch (error) {
         console.error(error)
      }
   }

   useEffect(() => {
      DeviceEventEmitter.addListener('EVENT_DEVICE_DISCOVER_DONE', () => {
         console.log('emiiter')
         setIsDisconvering(false)
      })
   }, [])

   const connectToPrinter = async (printer: BluetoothDevice) => {
      await BluetoothManager.connect(printer.address)
      await BluetoothEscposPrinter.printerAlign(ALIGN.CENTER)
      await BluetoothEscposPrinter.printText('TESTE DE IMPRESSAO\n\r', {
         codepage: 0,
         widthtimes: 1,
         heigthtimes: 1,
         fonttype: 1
      })
      systemParamsService.save({
         systemParamsId: 1,
         code: '',
         name: 'PRINTER',
         value: printer.address
      })
      setConnectedPrinter(printer)
   }

   const print = async (order: Order) => {
      console.log('print')
      try {
         if (!connectedPrinter?.address) {
            errorToast('Nenhuma impressora conectada')
            return
         }
         setIsPrinting(true)
         await BluetoothManager.connect(connectedPrinter.address)
         await BluetoothEscposPrinter.printerAlign(ALIGN.CENTER)
         await BluetoothEscposPrinter.printText(
            `PEDIDO #${order.orderId.toString().padStart(4, '0')}\n\r`,
            {
               codepage: 0,
               widthtimes: 2,
               heigthtimes: 2,
               fonttype: 1
            }
         )
         await BluetoothEscposPrinter.printText(
            `Horario: ${dayjs(order.created_at).format('HH:mm:ss')}\n\r`,
            {}
         )
         await BluetoothEscposPrinter.printAndFeed(20)
         await BluetoothEscposPrinter.printerAlign(ALIGN.CENTER)
         if (order.clientName) {
            await BluetoothEscposPrinter.printText('DADOS DO CLIENTE\n\r', {
               codepage: 0,
               widthtimes: 2,
               heigthtimes: 2,
               fonttype: 1
            })
            await BluetoothEscposPrinter.printAndFeed(15)
            if (order.clientName) {
               await BluetoothEscposPrinter.printText(
                  `Nome: ${order.clientName.replaceAll('ç', 'c')}\n\r`,
                  {}
               )
            }
            if (order.client?.phoneNumber) {
               await BluetoothEscposPrinter.printText(
                  `Telefone: ${order.client.phoneNumber}\n\r`,
                  {}
               )
            }

            await BluetoothEscposPrinter.printText(
               '--------------------------------\n\r',
               {}
            )
         }

         await BluetoothEscposPrinter.printerAlign(ALIGN.CENTER)
         await BluetoothEscposPrinter.printText('PRODUTOS\n\r', {
            codepage: 0,
            widthtimes: 2,
            heigthtimes: 2,
            fonttype: 1
         })
         await BluetoothEscposPrinter.printAndFeed(15)
         if (order?.orderProducts?.length) {
            for (const item of order.orderProducts) {
               await BluetoothEscposPrinter.printerAlign(ALIGN.LEFT)
               await BluetoothEscposPrinter.printText(
                  `Nome: ${item.product.name.replaceAll('ç', 'c')}\n\r`,
                  {}
               )
               await BluetoothEscposPrinter.printText(
                  `Preco: R$${item.unitPrice.toFixed(2)}\n\r`,
                  {}
               )

               if (item.details) {
                  await BluetoothEscposPrinter.printText(
                     `Detalhes: ${item.details.replaceAll('ç', 'c')}\n\r`,
                     {}
                  )
               }

               if (item.selectedIngredients?.length) {
                  for (const ingredient of item.selectedIngredients) {
                     await BluetoothEscposPrinter.printText(
                        `  - ${ingredient.name.replaceAll('ç', 'c')}${
                           ingredient.price
                              ? `: R$${ingredient.price.toFixed(2)}`
                              : ''
                        }\n\r`,
                        {}
                     )
                  }
               }

               if (item.unitPrice !== item.totalPrice) {
                  await BluetoothEscposPrinter.printText(
                     `Preco total: R$${item.totalPrice.toFixed(2)}\n\r`,
                     {}
                  )
               }

               await BluetoothEscposPrinter.printText(
                  '--------------------------------\n\r',
                  {}
               )
            }
         }

         await BluetoothEscposPrinter.printerAlign(ALIGN.CENTER)
         await BluetoothEscposPrinter.printText('PAGAMENTO\n\r', {
            codepage: 0,
            widthtimes: 2,
            heigthtimes: 2,
            fonttype: 1
         })
         await BluetoothEscposPrinter.printAndFeed(15)
         if (order.paymentStatus?.name) {
            await BluetoothEscposPrinter.printText(
               `Status: ${order.paymentStatus.name.toUpperCase()}\n\r`,
               {}
            )
         }
         if (order.paymentMethod?.name) {
            await BluetoothEscposPrinter.printText(
               `Forma de pagamento: ${order.paymentMethod.name.replaceAll(
                  'ç',
                  'c'
               )}\n\r`,
               {}
            )
         }
         if (order.changeFor) {
            await BluetoothEscposPrinter.printText(
               `Troco: R$${order.changeFor.toFixed(2)}\n\r`,
               {}
            )
         }
         let total = order.totalPrice
         if (order.deliveryFee) {
            total += order.deliveryFee
            await BluetoothEscposPrinter.printText(
               `Taxa de entrega: R$${order.deliveryFee.toFixed(2)}\n\r`,
               {}
            )
         }
         await BluetoothEscposPrinter.printText(
            `Valor total produtos: R$${order.totalPrice.toFixed(2)}\n\r`,
            {}
         )

         await BluetoothEscposPrinter.printText(
            `Valor total pedido: R$${total.toFixed(2)}\n\r`,
            {}
         )

         await BluetoothEscposPrinter.printText(
            '--------------------------------\n\r',
            {}
         )

         if (order.address) {
            await BluetoothEscposPrinter.printerAlign(ALIGN.CENTER)
            await BluetoothEscposPrinter.printText('ENDERECO\n\r', {
               codepage: 0,
               widthtimes: 2,
               heigthtimes: 2,
               fonttype: 1
            })
            await BluetoothEscposPrinter.printAndFeed(15)

            if (order.address.neighborhood) {
               await BluetoothEscposPrinter.printText(
                  `Bairro: ${order.address.neighborhood.replaceAll(
                     'ç',
                     'c'
                  )}\n\r`,
                  {}
               )
            }
            if (order.address.number) {
               await BluetoothEscposPrinter.printText(
                  `Número: ${order.address.number}\n\r`,
                  {}
               )
            }
            if (order.address.complement) {
               await BluetoothEscposPrinter.printText(
                  `Complemento: ${order.address.complement.replaceAll(
                     'ç',
                     'c'
                  )}\n\r`,
                  {}
               )
            }
            if (order.address.zipCode) {
               await BluetoothEscposPrinter.printText(
                  `CEP: ${order.address.zipCode}\n\r`,
                  {}
               )
            }
            if (order.address.city) {
               await BluetoothEscposPrinter.printText(
                  `Cidade: ${order.address.city.replaceAll('ç', 'c')}\n\r`,
                  {}
               )
            }

            await BluetoothEscposPrinter.printText(
               '--------------------------------\n\r',
               {}
            )
         }

         await BluetoothEscposPrinter.printerAlign(ALIGN.CENTER)
         await BluetoothEscposPrinter.printText(
            'Obrigado pela preferencia!\n\r\n\r',
            {}
         )
         await BluetoothEscposPrinter.cutLine(5)
      } catch (error) {
         console.error(error)
      }
      setIsPrinting(false)
   }

   return (
      <PrinterContext.Provider
         value={{
            connectToPrinter,
            print,
            scanDevices,
            isDiscovering,
            devices,
            connectedPrinter,
            isPrinting
         }}
      >
         {children}
      </PrinterContext.Provider>
   )
}

/**
 * Hook para usar o contexto da impressora
 */
export const usePrinter = (): PrinterContextType => {
   const context = useContext(PrinterContext)
   if (!context) {
      throw new Error('usePrinter deve ser usado dentro de um PrinterProvider')
   }
   return context
}
