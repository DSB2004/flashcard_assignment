import { createAsyncThunk } from "@reduxjs/toolkit";
import FLASHCARD_API from "../../../../api/flashcard.api";

const EditFlashcardThunk = createAsyncThunk('edit-flashcard-thunk', async (card: { id: string, ques: string, ans: string }) => {
    try {
        console.log(card)
        const result = await FLASHCARD_API.patch('/', card);
        console.log(result)
        if (result) {
            return result.data.msg;
        }
    }
    catch (err) {
        console.log(err)
    }
}
)

export default EditFlashcardThunk;