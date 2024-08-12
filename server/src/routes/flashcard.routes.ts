import { Router } from "express";
import ADD_FLASHCARD from "../controller/flashcard_routes/add_flashcard.controller";
import DELETE_FLASHCARD from "../controller/flashcard_routes/delete_flashcard.controller";
import UPDATE_FLASHCARD from "../controller/flashcard_routes/update_flashcard.controller";
import GET_FLASHCARDS from "../controller/flashcard_routes/get_flashcard.controller";
import TOKEN_MIDDLEWARE from "../middlewares/token-mddleware";

const FLASHCARD_ROUTER = Router();

FLASHCARD_ROUTER.post('/', TOKEN_MIDDLEWARE, ADD_FLASHCARD);

FLASHCARD_ROUTER.delete('/', TOKEN_MIDDLEWARE, DELETE_FLASHCARD);

FLASHCARD_ROUTER.patch('/', TOKEN_MIDDLEWARE, UPDATE_FLASHCARD);

FLASHCARD_ROUTER.get('/', GET_FLASHCARDS);

export default FLASHCARD_ROUTER;