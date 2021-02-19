/* eslint-disable import/no-anonymous-default-export */
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import reducer from "./reducer"


export default function () {
    return configureStore({
        reducer,
        /*preloadedState: {
            list: []
        },*/
        middleware: [
            ...getDefaultMiddleware(),
        ]
    })
}