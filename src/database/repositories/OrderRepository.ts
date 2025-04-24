import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/orm-config';
import { Order } from '../models/Order';
import { OrderProduct } from '../models/OrderProduct';

export class OrderRepository {
  private repository: Repository<Order>;
  private orderProductRepository: Repository<OrderProduct>;

  constructor() {
    this.repository = AppDataSource.getRepository(Order);
    this.orderProductRepository = AppDataSource.getRepository(OrderProduct);
  }

  async create(order: Partial<Order>): Promise<Order> {
    const newOrder = this.repository.create(order);
    return await this.repository.save(newOrder);
  }

  async findAll(): Promise<Order[]> {
    return await this.repository.find({
      relations: ['client', 'paymentMethod', 'orderSituation', 'orderProducts.product', 'address']
    });
  }

  async findById(id: number): Promise<Order | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['client', 'paymentMethod', 'orderSituation', 'orderProducts.product', 'address']
    });
  }

  async update(id: number, order: Partial<Order>): Promise<Order | null> {
    await this.repository.update(id, order);
    return await this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async addProduto(orderId: number, productId: number, details?: string): Promise<void> {
    const orderProduct = this.orderProductRepository.create({
      orderId,
      productId,
      details
    });
    await this.orderProductRepository.save(orderProduct);
  }

  async removeOrderProduct(orderId: number, productId: number): Promise<void> {
    await this.orderProductRepository.delete({
      orderId,
      productId
    });
  }
} 