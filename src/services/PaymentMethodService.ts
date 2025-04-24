import { PaymentMethodRepository } from '../database/repositories';
import { PaymentMethod } from '../database/models/PaymentMethod';

export class PaymentMethodService {
  private repository: PaymentMethodRepository;

  constructor() {
    this.repository = new PaymentMethodRepository();
  }

  async save(paymentMethod: Partial<PaymentMethod>): Promise<PaymentMethod> {
    return await this.repository.create(paymentMethod);
  }

  async listAll(): Promise<PaymentMethod[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<PaymentMethod | null> {
    return await this.repository.findById(id);
  }
} 