import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Тип данных для запроса
export interface QueryData {
  id: string;
  title: string;
  name: string;
  sorted: string;
  maxCount: string;
}

// Тип данных для результата
export interface QueryResult {
  title: string;
  videoId: string;
  likeCount: string;
  viewCount: string;
  commentCount: string;
  description: string;
  date: string;
}

// Тип состояния Redux
interface InitialState {
  queryList: QueryData[]; // Список всех запросов
  queryResults: Record<string, QueryResult[]>; // Результаты, сгруппированные по ID запроса
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: InitialState = {
  queryList: [], // Пустой массив запросов
  queryResults: {}, // Пустой объект для результатов
  loading: false,
  error: null,
};

// Слайс Redux
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addData(
      state,
      action: PayloadAction<{
        queryList: QueryData;
        queryResults: QueryResult[];
      }>
    ) {
      const { queryList, queryResults } = action.payload;
      state.queryResults = {
        ...state.queryResults, // Копируем текущее состояние
        [queryList.id]: queryResults, // Обновляем или добавляем новый ключ
      };

      // Если необходимо обновлять queryList, например как массив
      state.queryList.push(queryList); // Если queryList — массив
    },
    // Добавление нового запроса в список
    addQueryData(state, action: PayloadAction<QueryData>) {
      state.queryList.push(action.payload);
    },

    // Удаление запроса по его ID
    removeQueryData(state, action: PayloadAction<string>) {
      state.queryList = state.queryList.filter(
        (query) => query.id !== action.payload
      );
      delete state.queryResults[action.payload]; // Удаляем результаты запроса
    },

    // Обновление результатов для конкретного запроса
    setQueryResults(
      state,
      action: PayloadAction<{ id: string; results: QueryResult[] }>
    ) {
      state.queryResults[action.payload.id] = action.payload.results;
    },

    setQueryLists(
      state,
      action: PayloadAction<{ id: string; result: QueryData }>
    ) {
      // state.queryList[action.payload.id] = action.payload.result;
      const { id, result } = action.payload;

      state.queryList = state.queryList.map(
        (item) => (item.id === id ? { ...item, ...result } : item) // Обновляем только нужный элемент
      );
    },

    // Управление состоянием загрузки
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    // Установка сообщения об ошибке
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  addData,
  addQueryData,
  removeQueryData,
  setQueryResults,
  setQueryLists,
  setLoading,
  setError,
} = dataSlice.actions;

export default dataSlice.reducer;
