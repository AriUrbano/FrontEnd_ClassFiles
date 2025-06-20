import { AxiosInstance } from 'axios';

export class ProjectsApi {
  constructor(private readonly client: AxiosInstance) {}

  async createProject(projectData: any) {
    const response = await this.client.post('/projects', projectData);
    return response.data;
  }

  async getProjects() {
    const response = await this.client.get('/projects');
    return response.data;
  }

  async getProjectById(id: string) {
    const response = await this.client.get(`/projects/${id}`);
    return response.data;
  }

  async updateProject(id: string, updates: any) {
    const response = await this.client.patch(`/projects/${id}`, updates);
    return response.data;
  }

  async deleteProject(id: string) {
    const response = await this.client.delete(`/projects/${id}`);
    return response.data;
  }
}