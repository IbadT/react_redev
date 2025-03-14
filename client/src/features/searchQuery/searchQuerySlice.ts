import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type QueryType = {
  id: string;
  title: string;
  name: string;
  sorted: string;
  maxCount: string;

  likeCount?: string;
  viewCount?: string;
  commentCount?: string;
};

export interface SearchQueryState {
  queries: QueryType[];
}

const initialState: SearchQueryState = {
  queries: [],
};

export const searchQuerySlice = createSlice({
  name: "queries",
  initialState,
  reducers: {
    getSearchQueryById: (state, action: PayloadAction<string>) => {
      state.queries.find((query) => query.id === action.payload);
    },
    addSearchQuery: (state, action: PayloadAction<QueryType>) => {
      state.queries.push(action.payload);
    },
    updateSearchQuery: (state, action: PayloadAction<QueryType>) => {
      const index = state.queries.findIndex(
        (query) => query.id === action.payload.id
      );
      if (index !== -1) {
        state.queries[index] = action.payload;
      }
    },
    removeSearchQuery: (state, action: PayloadAction<string>) => {
      state.queries = state.queries.filter(
        (query) => query.id !== action.payload
      );
    },
    clearSearchQuery: (state) => {
      state.queries = initialState.queries;
    },
  },
});

export const {
  getSearchQueryById,
  addSearchQuery,
  updateSearchQuery,
  removeSearchQuery,
  clearSearchQuery,
} = searchQuerySlice.actions;
export default searchQuerySlice.reducer;
