import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading, setError, setQueryResults } from './queryDataSlice';
import { QueryData, QueryResult } from './queryDataSlice';
import * as Sentry from "@sentry/react";


export const fetchQueryResults = createAsyncThunk(
  'data/fetchQueryResults',
  async (queryData: QueryData, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch('http://example.com/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(queryData),
      });
      if (!response.ok) {
        throw new Error('Ошибка при выполнении запроса');
      }
      const data: QueryResult[] = await response.json();
      dispatch(setQueryResults({ id: queryData.id, results: data })); // Сохраняем результаты для конкретного ID
    } catch (error: any) {
      Sentry.captureException(error);
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
