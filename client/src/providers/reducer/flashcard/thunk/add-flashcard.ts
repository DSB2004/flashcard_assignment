import { createAsyncThunk } from "@reduxjs/toolkit";
import FLASHCARD_API from "../../../../api/flashcard.api";

const AddFlashcardThunk = createAsyncThunk('add-flashcard-thunk', async (card: {  ques: string, ans: string }) => {
    try {
        const result = await FLASHCARD_API.post('/', card);
        if (result) {
            return result.data.msg;
        }
    }
    catch (err) {
        console.log(err)
    }
}
)

export default AddFlashcardThunk;