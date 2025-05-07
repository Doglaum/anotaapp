import { AppDataSource } from '../config/orm-config'
import {
   OrderSituationService,
   PaymentMethodService,
   PaymentStatusService
} from '@/services/'
import { PaymentMethodEnum } from './enums/PaymentMethodEnum'
import { OrderSituationEnum } from './enums/OrderSituationEnum'
import { PaymentSituationEnum } from './enums/PaymentSituationEnums'

const defaultPaymentMethods = [
   { paymentMethodId: PaymentMethodEnum.DINHEIRO, name: 'Dinheiro' },
   {
      paymentMethodId: PaymentMethodEnum.CARTAO_CREDITO,
      name: 'Cartão de Crédito'
   },
   {
      paymentMethodId: PaymentMethodEnum.CARTAO_DEBITO,
      name: 'Cartão de Débito'
   },
   { paymentMethodId: PaymentMethodEnum.PIX, name: 'PIX' }
]

const defaultOrderSituations = [
   { orderSituationId: OrderSituationEnum.PREPARANDO, name: 'Preparando' },
   { orderSituationId: OrderSituationEnum.PENDENTE, name: 'Pendente' },
   { orderSituationId: OrderSituationEnum.CANCELADO, name: 'Cancelado' }
]

const defaultPaymentStatus = [
   { paymentStatusId: PaymentSituationEnum.PAGO, name: 'Pago' },
   { paymentStatusId: PaymentSituationEnum.PENDENTE, name: 'Pendente' },
   {
      paymentStatusId: PaymentSituationEnum.PAGAR_NA_ENTREGA,
      name: 'Pagar na entrega'
   }
]

export const initDatabase = async (): Promise<void> => {
   try {
      if (!AppDataSource.isInitialized) {
         await AppDataSource.initialize()
      }
      console.log('Banco de dados inicializado com sucesso!')

      await insertDefaultData(
         new PaymentMethodService(),
         defaultPaymentMethods,
         'Formas de pagamento padrão verificadas e atualizadas.'
      )

      await insertDefaultData(
         new PaymentStatusService(),
         defaultPaymentStatus,
         'Situações de pedido padrão verificadas e atualizadas.'
      )

      await insertDefaultData(
         new OrderSituationService(),
         defaultOrderSituations,
         'Situações de pagamento padrão verificadas e atualizadas.'
      )

      console.log('Todos os dados padrão foram verificados e atualizados.')
   } catch (error) {
      console.error('Erro ao inicializar o banco de dados:', error)
      throw error
   }
}

const insertDefaultData = async (
   service: {
      listAll: () => Promise<any[]>
      save: (data: any) => Promise<any>
   },
   defaultData: any[],
   successMessage: string
): Promise<void> => {
   const existentDatas = await service.listAll()
   for (const data of defaultData) {
      const exists = existentDatas.some(item => item.name === data.name)
      if (!exists) {
         await service.save(data).catch(error => {
            console.error(`Erro ao gravar "${data.name}":`, error)
         })
         console.log(`"${data.name}" foi inserido.`)
      }
   }
   console.log(successMessage)
}

export default AppDataSource
