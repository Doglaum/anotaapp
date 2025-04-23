import { AppDataSource } from '../config/orm-config';
import { FormaPagamentoService } from '../services/FormaPagamentoService';
import { SituacaoPedidoService } from '../services/SituacaoPedidoService';
import { FormaPagamentoEnum } from './enums/FormaPagamentoEnum';
import { SituacaoPedidoEnum } from './enums/SituacaoPedidoEnum';

const formasPagamentoPadrao = [
  { id: FormaPagamentoEnum.DINHEIRO, nome: 'Dinheiro' },
  { id: FormaPagamentoEnum.CARTAO_CREDITO, nome: 'Cartão de Crédito' },
  { id: FormaPagamentoEnum.CARTAO_DEBITO, nome: 'Cartão de Débito' },
  { id: FormaPagamentoEnum.PIX, nome: 'PIX' },
];

const situacoesPedidoPadrao = [
  { id: SituacaoPedidoEnum.PAGO, nome: 'Pago' },
  { id: SituacaoPedidoEnum.PENDENTE, nome: 'Pendente' },
  { id: SituacaoPedidoEnum.CANCELADO, nome: 'Cancelado' },
];

export const initDatabase = async (): Promise<void> => {
  try {
    if(!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    console.log('Banco de dados inicializado com sucesso!');

    await verificarEInserirDadosPadrao(
      new FormaPagamentoService(),
      formasPagamentoPadrao,
      'Formas de pagamento padrão verificadas e atualizadas.'
    );

    await verificarEInserirDadosPadrao(
      new SituacaoPedidoService(),
      situacoesPedidoPadrao,
      'Situações de pedido padrão verificadas e atualizadas.'
    );

    console.log('Todos os dados padrão foram verificados e atualizados.');
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    throw error;
  }
};

const verificarEInserirDadosPadrao = async (
  service: { listar: () => Promise<any[]>; gravar: (data: any) => Promise<any> },
  dadosPadrao: any[],
  mensagemSucesso: string
): Promise<void> => {
  const dadosExistentes = await service.listar();
  for (const dado of dadosPadrao) {
    const existe = dadosExistentes.some((item) => item.nome === dado.nome);
    if (!existe) {
      await service.gravar(dado).catch((error) => {
        console.error(`Erro ao gravar "${dado.nome}":`, error);
      });
      console.log(`"${dado.nome}" foi inserido.`);
    }
  }
  console.log(mensagemSucesso);
};

export default AppDataSource;