import { configureStore } from "@reduxjs/toolkit";
import menuReducer from './menu/menuSlice';
import modalReducer from './modal/modalSlice';
import notesListReducer from './notesList/notesListSlice';
import tagsReducer from './tags/tagsSlice';

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        modal: modalReducer,
        tags: tagsReducer,
        notesList: notesListReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;