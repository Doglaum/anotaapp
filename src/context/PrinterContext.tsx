import { errorToast } from '@/components'
import { Order } from '@/database/models'
import React, { createContext, useContext, useState } from 'react'
import {
   DeviceInfo,
   Printer,
   PrinterConstants,
   usePrintersDiscovery
} from 'react-native-esc-pos-printer'

type PrinterContextType = {
   connectToPrinter: (device: DeviceInfo) => Promise<void>
   print: (order: Order) => Promise<void>
   printing: boolean
}

const PrinterContext = createContext<PrinterContextType | undefined>(undefined)

export const PrinterProvider: React.FC<{ children: React.ReactNode }> = ({
   children
}) => {
   const { pairBluetoothDevice } = usePrintersDiscovery()
   const [printer, setPrinter] = useState<Printer | null>(null)
   const [printing, setPrinting] = useState(false)

   /**
    * Conecta à impressora Bluetooth
    */
   const connectToPrinter = async (device: DeviceInfo) => {
      try {
         // Emparelha o dispositivo Bluetooth
         //await pairBluetoothDevice(device.macAddress)

         // Cria uma instância da impressora
         const connectedPrinter = new Printer({
            target: device.macAddress,
            deviceName: device.deviceName
         })
         setPrinter(connectedPrinter)
         console.log(`Conectado à impressora: ${device.deviceName}`)
      } catch (error) {
         console.error('Erro ao conectar à impressora:', error)
      }
   }

   /**
    * Envia comandos de impressão para a impressora
    */
   const print = async (order: Order) => {
      if (!printer) {
         errorToast('Ocorreu um erro ao tentar imprimir')
         return
      }
      try {
         setPrinting(true)

         const res = await printer.addQueueTask(async () => {
            // Conecta à impressora
            await Printer.tryToConnectUntil(
               printer,
               status => status.online.statusCode === PrinterConstants.TRUE
            )

            // Centraliza o texto e adiciona o título
            await printer.addTextAlign(PrinterConstants.ALIGN_CENTER)
            await printer.addTextSize({ width: 2, height: 2 })
            await printer.addText('RECIBO DO PEDIDO\n')
            await printer.addFeedLine()

            // Adiciona os dados do cliente
            await printer.addTextAlign(PrinterConstants.ALIGN_LEFT)
            await printer.addTextSize({ width: 1, height: 1 })
            await printer.addText('--- Dados do Cliente ---\n')
            await printer.addText(`Nome: ${order.clientName}\n`)
            await printer.addText(
               `Telefone: ${order.client?.phoneNumber || 'Não informado'}\n`
            )
            await printer.addFeedLine()

            // Adiciona os produtos
            await printer.addText('--- Produtos ---\n')
            for (const item of order.orderProducts || []) {
               await printer.addText(`Nome: ${item.product.name}\n`)
               await printer.addText(`Preço: R$${item.unitPrice.toFixed(2)}\n`)
               if (item.details) {
                  await printer.addText(`Detalhes: ${item.details}\n`)
               }
               if (item.selectedIngredients) {
                  for (const ingredient of item.selectedIngredients) {
                     await printer.addText(
                        `  - ${ingredient.name} ${
                           ingredient.price
                              ? `R$${ingredient.price.toFixed(2)}`
                              : ''
                        }\n`
                     )
                  }
               }
               if (item.unitPrice !== item.totalPrice) {
                  await printer.addText(
                     `Preço total: R$${item.totalPrice.toFixed(2)}\n`
                  )
               }
               await printer.addFeedLine()
            }

            // Adiciona os dados de pagamento
            await printer.addText('--- Pagamento ---\n')
            await printer.addText(
               `Status: ${order.paymentStatus?.name.toUpperCase()}\n`
            )
            await printer.addText(
               `Forma de pagamento: ${order.paymentMethod?.name}\n`
            )
            await printer.addText(
               `Troco: R$${order.changeFor?.toFixed(2) || '0.00'}\n`
            )
            await printer.addText(
               `Taxa de entrega: R$${order.deliveryFee?.toFixed(2) || '0.00'}\n`
            )
            await printer.addText(
               `Valor total: R$${order.totalPrice?.toFixed(2) || '0.00'}\n`
            )
            await printer.addFeedLine()

            // Adiciona os dados do endereço (se houver)
            if (order.address) {
               await printer.addText('--- Endereço ---\n')
               await printer.addText(`Bairro: ${order.address.neighborhood}\n`)
               await printer.addText(`Número: ${order.address.number}\n`)
               await printer.addText(
                  `Complemento: ${order.address.complement}\n`
               )
               await printer.addText(`CEP: ${order.address.zipCode}\n`)
               await printer.addText(`Cidade: ${order.address.city}\n`)
               await printer.addFeedLine()
            }
            // Adiciona o corte do papel
            await printer.addCut()

            // Envia os dados para a impressora
            const result = await printer.sendData()

            // Desconecta da impressora
            await printer.disconnect()

            return result
         })
      } catch (e) {
         errorToast('Erro ao imprimir:' + e)
         await printer.disconnect()
      } finally {
         setPrinting(false)
      }
   }

   return (
      <PrinterContext.Provider value={{ connectToPrinter, print, printing }}>
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
