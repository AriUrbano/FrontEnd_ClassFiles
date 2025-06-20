import { AxiosInstance } from 'axios';

export class ClientsApi {
  constructor(private readonly client: AxiosInstance) {}

  async createClient(clientData: any) {
    const response = await this.client.post('/clients', clientData);
    return response.data;
  }

  async getClients() {
    const response = await this.client.get('/clients');
    return response.data;
  }

  async getClientById(id: string) {
    const response = await this.client.get(`/clients/${id}`);
    return response.data;
  }

  async updateClient(id: string, updates: any) {
    const response = await this.client.patch(`/clients/${id}`, updates);
    return response.data;
  }

  async deleteClient(id: string) {
    const response = await this.client.delete(`/clients/${id}`);
    return response.data;
  }
}