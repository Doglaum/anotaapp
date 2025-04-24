import { AppDataSource } from '../config/orm-config';
import { PaymentMethodService } from '../services/PaymentMethodService';
import { OrderSituationService } from '../services/OrderSituationService';
import { PaymentMethodEnum } from './enums/PaymentMethodEnum';
import { OrderSituationEnum } from './enums/OrderSituationEnum';

const defaultPaymentMethods = [
  { id: PaymentMethodEnum.DINHEIRO, name: 'Dinheiro' },
  { id: PaymentMethodEnum.CARTAO_CREDITO, name: 'Cartão de Crédito' },
  { id: PaymentMethodEnum.CARTAO_DEBITO, name: 'Cartão de Débito' },
  { id: PaymentMethodEnum.PIX, name: 'PIX' },
];

const defaultOrderSituations = [
  { id: OrderSituationEnum.PAGO, name: 'Pago' },
  { id: OrderSituationEnum.PENDENTE, name: 'Pendente' },
  { id: OrderSituationEnum.CANCELADO, name: 'Cancelado' },
];

export const initDatabase = async (): Promise<void> => {
  try {
    if(!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    console.log('Banco de dados inicializado com sucesso!');

    await insertDefaultData(
      new PaymentMethodService(),
      defaultPaymentMethods,
      'Formas de pagamento padrão verificadas e atualizadas.'
    );

    await insertDefaultData(
      new OrderSituationService(),
      defaultOrderSituations,
      'Situações de pedido padrão verificadas e atualizadas.'
    );

    console.log('Todos os dados padrão foram verificados e atualizados.');
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    throw error;
  }
};

const insertDefaultData = async (
  service: { listAll: () => Promise<any[]>; save: (data: any) => Promise<any> },
  defaultData: any[],
  successMessage: string
): Promise<void> => {
  const existentDatas = await service.listAll();
  for (const data of defaultData) {
    const exists = existentDatas.some((item) => item.name === data.name);
    if (!exists) {
      await service.save(data).catch((error) => {
        console.error(`Erro ao gravar "${data.name}":`, error);
      });
      console.log(`"${data.name}" foi inserido.`);
    }
  }
  console.log(successMessage);
};

export default AppDataSource;