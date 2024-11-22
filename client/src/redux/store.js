import { configureStore } from "@reduxjs/toolkit"
import useReducer  from "./userSlite"

export const store = configureStore({
    reducer: {
        user : useReducer
    },
})