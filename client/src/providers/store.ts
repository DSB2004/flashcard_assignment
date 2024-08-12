import { configureStore } from "@reduxjs/toolkit";
import FLASHCARD_REDUCER from "./reducer/flashcard"
const Store = configureStore({
    reducer: {
        FLASHCARD_REDUCER
    }
})


export default Store