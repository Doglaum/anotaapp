import { ClientRepository } from '../database/repositories'
import { Client } from '../database/models/Client'
import { errorToast, infoToast, successToast } from '@/components'

export class ClientService {
   private repository: ClientRepository

   constructor() {
      this.repository = new ClientRepository()
   }

   async save(client: Client): Promise<Client> {
      this.validate(client)
      let newClient = {} as Client
      try {
         newClient = await this.repository.create(client)
      } catch (error) {
         console.error(error)
         throw new Error('Erro ao cadastrar cliente')
      }
      successToast('Cliente cadastrado com sucesso')
      return newClient
   }

   async listAll(): Promise<Client[]> {
      return await this.repository.findAll()
   }

   async findById(id: number): Promise<Client | null> {
      const cliente = await this.repository.findById(id)
      if (!cliente) {
         errorToast('Nenhum cliente encontrado')
         throw new Error('Nenhum cliente encontrado')
      }
      return cliente
   }

   async update(
      id: number,
      partialCliente: Partial<Client>
   ): Promise<Client | null> {
      this.validate(partialCliente)
      return await this.repository.update(id, partialCliente)
   }

   async delete(id: number): Promise<void> {
      try {
         await this.repository.delete(id)
         successToast('Cliente removido com sucesso!')
      } catch (error) {
         console.error(error)
         errorToast('Erro ao remover cliente')
         throw new Error('Erro ao remover cliente')
      }
   }

   private validate(cliente: Partial<Client> | Client) {
      if (!cliente.name || cliente.phoneNumber) {
         if (!cliente.name) {
            const text = 'Nome é obrigatório'
            errorToast(text)
            throw new Error(text)
         }
         if ((cliente.phoneNumber?.length || 0) < 14) {
            const text = 'Número inválido'
            infoToast(text)
            throw new Error(text)
         }
      }
   }
}
