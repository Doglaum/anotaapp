import { PaymentStatusRepository } from '../database/repositories';
import { PaymentStatus } from '@/database/models'; 

export class PaymentStatusService {
  private repository: PaymentStatusRepository;

  constructor() {
    this.repository = new PaymentStatusRepository();
  }

  async save(paymentStatus: Partial<PaymentStatus>): Promise<PaymentStatus> {
    return await this.repository.create(paymentStatus);
  }

  async listAll(): Promise<PaymentStatus[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<PaymentStatus | null> {
    return await this.repository.findById(id);
  }
} 