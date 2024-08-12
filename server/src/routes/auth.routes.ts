import { Router } from "express";
import LOGIN from "../controller/auth/login.controller";
import REGISTER from "../controller/auth/register.controller";

const AUTH_ROUTER = Router();

AUTH_ROUTER.post('/login', LOGIN);

AUTH_ROUTER.post('/register', REGISTER);

export default AUTH_ROUTER;