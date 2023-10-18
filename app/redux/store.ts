"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import groupeMessageReducer from "./features/messages/groupMessagesSlice";
import privateMessageReducer from "./features/messages/privateMessageSlice"


export const store = configureStore({
    reducer: combineReducers({
        group: groupeMessageReducer,
        private: privateMessageReducer
    }),
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
