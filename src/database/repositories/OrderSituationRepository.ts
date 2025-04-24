import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/orm-config';
import { OrderSituation } from '../models/OrderSituation';

export class OrderSituationRepository {
  private repository: Repository<OrderSituation>;

  constructor() {
    this.repository = AppDataSource.getRepository(OrderSituation);
  }

  async create(orderSituation: Partial<OrderSituation>): Promise<OrderSituation> {
    const newOrderSituation = this.repository.create(orderSituation);
    return await this.repository.save(newOrderSituation);
  }

  async findAll(): Promise<OrderSituation[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<OrderSituation | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, orderSituation: Partial<OrderSituation>): Promise<OrderSituation | null> {
    await this.repository.update(id, orderSituation);
    return await this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
} 