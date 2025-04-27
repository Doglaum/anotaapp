import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/orm-config';
import { PaymentStatus } from '../models/PaymentStatus';

export class PaymentStatusRepository {
  private repository: Repository<PaymentStatus>;

  constructor() {
    this.repository = AppDataSource.getRepository(PaymentStatus);
  }

  async create(paymentStatus: Partial<PaymentStatus>): Promise<PaymentStatus> {
    const newPaymentStatus = this.repository.create(paymentStatus);
    return await this.repository.save(newPaymentStatus);
  }

  async findAll(): Promise<PaymentStatus[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<PaymentStatus | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, paymentStatus: Partial<PaymentStatus>): Promise<PaymentStatus | null> {
    await this.repository.update(id, paymentStatus);
    return await this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
} 