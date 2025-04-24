import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/orm-config';
import { PaymentMethod } from '../models/PaymentMethod';

export class PaymentMethodRepository {
  private repository: Repository<PaymentMethod>;

  constructor() {
    this.repository = AppDataSource.getRepository(PaymentMethod);
  }

  async create(paymentMethod: Partial<PaymentMethod>): Promise<PaymentMethod> {
    const newPaymentMethod = this.repository.create(paymentMethod);
    return await this.repository.save(newPaymentMethod);
  }

  async findAll(): Promise<PaymentMethod[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<PaymentMethod | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, paymentMethod: Partial<PaymentMethod>): Promise<PaymentMethod | null> {
    await this.repository.update(id, paymentMethod);
    return await this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
} 