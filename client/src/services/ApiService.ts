import axios from 'axios';
import { QueryResult, QueryData } from '../features/queryData/queryDataSlice';


class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Получение токена из localStorage
  private getAuthHeader() {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  // Получение списка избранного
  async fetchFavorites(): Promise<{ queryData: QueryData; queryResult: QueryResult[] }[]> {
    const url = `${this.baseUrl}/favorities`;
    const response = await axios.get(url, {
      headers: this.getAuthHeader(),
    });
    return response.data;
  };

    // Добавление queryLists
    // async addQueryList(body: QueryData): Promise<QueryData> {
    async addQueryList(body: any): Promise<QueryData> {
        const url = `${this.baseUrl}/favorities`;
        const response = await axios.post(url, body, {
          headers: this.getAuthHeader(),
        });
        return response.data;
      }
    
      // Добавление queryResults
      async addQueryResults(body: QueryResult): Promise<QueryResult> {
        const url = `${this.baseUrl}/videos`;
        const response = await axios.post(url, body, {
          headers: this.getAuthHeader(),
        });
        return response.data;
      }

  // Обновление избранного
  async updateFavorite(id: string, updatedData: Partial<QueryData>): Promise<QueryData> {
    const url = `${this.baseUrl}/favorities/${id}`;
    const response = await axios.patch(url, updatedData, {
      headers: this.getAuthHeader(),
    });
    return response.data;
  }

  // Удаление избранного
  async deleteFavorite(id: string): Promise<void> {
    const url = `${this.baseUrl}/favorities/${id}`;
    await axios.delete(url, {
      headers: this.getAuthHeader(),
    });
  }
}

// Экспортируем экземпляр класса для использования в компонентах
const apiService = new ApiService('http://localhost:3000/api');
export default apiService;