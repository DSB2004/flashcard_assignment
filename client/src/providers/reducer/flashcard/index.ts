import { createSlice } from "@reduxjs/toolkit";
import GetFlashcardThunk from "./thunk/get-flashcard";
import { flashcard_type } from "../../../types/flashcard.types";

interface FlashcardState {
    content: {
        [key: number]: flashcard_type[];
    };
}

const initialState: FlashcardState = { content: {} };


const FLASHCARD_REDUCER = createSlice({

    name: "flashcard_reducer",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(GetFlashcardThunk.fulfilled, (state, action) => {
            // @ts-ignore
            const { page, data } = action.payload;
            state.content[page] = data;
        });

    },

})

export default FLASHCARD_REDUCER.reducer;

