import { configureStore } from "@reduxjs/toolkit";
import searchQuerySlice from "./searchQuery/searchQuerySlice";
import queryDataSlice from "./queryData/queryDataSlice";


export const store = configureStore({
    reducer: {
        queries: searchQuerySlice,
        queryData: queryDataSlice,
    },
    // devTools: process.env.NODE_ENV !== 'production'
    // devTools: process.env.NODE_ENV === 'production',
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// для запуска в production режиме
// npx serve -s build