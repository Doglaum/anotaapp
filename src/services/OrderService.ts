import { OrderRepository } from '../database/repositories';
import { Order } from '../database/models/Order';

export class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async createOrder(order: Partial<Order>): Promise<Order> {    
    return await this.orderRepository.create(order)
  }

  async listAll(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }

  async findById(id: number): Promise<Order | null> {
    return await this.orderRepository.findById(id);
  }

  async deleteOrder(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
} 