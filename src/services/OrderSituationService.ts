import { OrderSituation } from "../database/models/OrderSituation";
import { OrderSituationRepository } from "../database/repositories/OrderSituationRepository";

export class OrderSituationService {
  private repository: OrderSituationRepository;

  constructor() {
    this.repository = new OrderSituationRepository();
  }

  async save(situacaoPedido: Partial<OrderSituation>): Promise<OrderSituation> {
    return await this.repository.create(situacaoPedido);
  }

  async listAll(): Promise<OrderSituation[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<OrderSituation | null> {
    return await this.repository.findById(id);
  }
} 