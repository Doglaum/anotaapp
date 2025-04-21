import { Cliente, Produto, Pedido, FormaPagamento, PedidoProduto, SituacaoPedido, Endereco, Ingrediente } from '../database/models';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({  
  type: 'expo',
  database: 'anotaapp.db',
  driver: require('expo-sqlite'),
  entities: [
    Cliente,
    Produto,
    Pedido,
    FormaPagamento,
    PedidoProduto,
    SituacaoPedido,
    Endereco,
    Ingrediente
  ],
  synchronize: true,
  logging: true,
}); 