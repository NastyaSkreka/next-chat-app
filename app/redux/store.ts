"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import groupeMessageReducer from "./features/messages/groupMessagesSlice";
import privateMessageReducer from "./features/messages/privateMessageSlice"
import conversationReducer from "./features/users/conversationSlice"


export const store = configureStore({
    reducer: combineReducers({
        group: groupeMessageReducer,
        private: privateMessageReducer, 
        conversation: conversationReducer,
    }),
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
