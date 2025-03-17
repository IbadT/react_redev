// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { QueryResult, QueryData } from '../features/queryData/queryDataSlice';





// class ApiService {
//   private baseUrl: string;
//   private axiosInstance: AxiosInstance;

//   constructor(baseUrl: string) {
//     this.baseUrl = baseUrl;

//     // Создаем экземпляр Axios
//     this.axiosInstance = axios.create({
//       baseURL: this.baseUrl,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     // Добавляем перехватчики
//     this.setupInterceptors();
//   }

//   // Получение токена из localStorage
//   private getAuthHeader(): { Authorization: string } {
//     const token = localStorage.getItem('accessToken');
//     return {
//       Authorization: `Bearer ${token}`,
//     };
//   }

//   // Настройка перехватчиков
//   private setupInterceptors(): void {
//     // Перехватчик для добавления access token в заголовки
//     this.axiosInstance.interceptors.request.use(
//       (config: InternalAxiosRequestConfig) => {
//         const authHeader = this.getAuthHeader();
//         if (authHeader.Authorization) {
//           config.headers = config.headers || {};
//           config.headers.Authorization = authHeader.Authorization;
//         }
//         return config;
//       },
//       (error: AxiosError) => {
//         return Promise.reject(error);
//       }
//     );

//     // Перехватчик для обработки ошибок и обновления токена
//     this.axiosInstance.interceptors.response.use(
//       (response: AxiosResponse) => response,
//       async (error: AxiosError) => {
//         const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

//         // Если ошибка 401 и это не запрос на обновление токена
//         if (error.response?.status === 401 && !originalRequest._retry) {
//           originalRequest._retry = true; // Помечаем запрос как повторный

//           try {
//             // Отправляем запрос на обновление токена
//             const refreshToken = localStorage.getItem('refresh_token');
//             const response = await axios.post(`${this.baseUrl}/auth/refresh`, { refreshToken });
//             console.log({ response });
            

//             // Сохраняем новый access token
//             const { accessToken } = response.data;
//             localStorage.setItem('accessToken', accessToken);

//             // Повторяем оригинальный запрос с новым токеном
//             originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//             return this.axiosInstance(originalRequest);
//           } catch (refreshError) {
//             // Если refresh token тоже истек, перенаправляем на страницу входа
//             localStorage.removeItem('accessToken');
//             localStorage.removeItem('refreshToken');
//             window.location.href = '/login'; // Перенаправление на страницу входа
//             return Promise.reject(refreshError);
//           }
//         }

//         return Promise.reject(error);
//       }
//     );
//   }



//   // Получение списка избранного
//   async fetchFavorites(): Promise<{ queryData: QueryData; queryResult: QueryResult[] }[]> {
//     const url = `${this.baseUrl}/favorities`;
//     const response = await this.axiosInstance.get(url);
//     return response.data;
//   }

//   // Добавление queryLists
//   async addQueryList(body: any): Promise<QueryData> {
//     const url = `${this.baseUrl}/favorities`;
//     const response = await this.axiosInstance.post(url, body);
//     return response.data;
//   }

//   // Добавление queryResults
//   async addQueryResults(body: QueryResult[]): Promise<QueryResult[]> {
//     const url = `${this.baseUrl}/videos`;
//     const response = await this.axiosInstance.post(url, body);
//     return response.data;
//   }

//   // Обновление избранного
//   async updateFavorite(id: string, updatedData: Partial<QueryData>): Promise<QueryData> {
//     const url = `${this.baseUrl}/favorities/${id}`;
//     const response = await this.axiosInstance.patch(url, updatedData);
//     return response.data;
//   }

//   // Удаление избранного
//   async deleteFavorite(id: string): Promise<void> {
//     const url = `${this.baseUrl}/favorities/${id}`;
//     await this.axiosInstance.delete(url);
//   }
// }

// // Экспортируем экземпляр класса для использования в компонентах
// const apiService = new ApiService('http://localhost:3000/api');
// export default apiService;











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
      async addQueryResults(body: QueryResult[]): Promise<QueryResult[]> {
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