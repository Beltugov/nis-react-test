import { configureStore } from "@reduxjs/toolkit";
import repoReducer from "./reducer/repoReducer";


const store = configureStore({
    reducer: {
        repoReducer,
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
