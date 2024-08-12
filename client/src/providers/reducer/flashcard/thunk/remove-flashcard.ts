import { createAsyncThunk } from "@reduxjs/toolkit";
import FLASHCARD_API from "../../../../api/flashcard.api";

const DeleteFlashcardThunk = createAsyncThunk('delete-flashcard-thunk', async (id: string) => {
    try {
        const result = await FLASHCARD_API.delete(`/?id=${id}`);
        if (result) {
            return result.data.msg;
        }
    }
    catch (err) {
        console.log(err)
    }
}
)

export default DeleteFlashcardThunk;