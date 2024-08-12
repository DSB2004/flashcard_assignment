import { createAsyncThunk } from "@reduxjs/toolkit";
import FLASHCARD_API from "../../../../api/flashcard.api";

const GetFlashcardThunk = createAsyncThunk('get-flashcard-thunk', async (page: number) => {
    try {
        const result = await FLASHCARD_API.get(`/?page=${page}`);
        if (result) {

            return {
                page, data: result.data.cards
            }
        }
    }
    catch (err) {
        console.log(err)
    }
}
)

export default GetFlashcardThunk;