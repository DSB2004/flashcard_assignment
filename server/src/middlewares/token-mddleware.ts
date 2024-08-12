import { Response, NextFunction, Request } from "express"
import { DECODE_TOKEN } from "../utils/handle-jwt";
const TOKEN_MIDDLEWARE = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['access-token'];
    try {
        if (!token || typeof (token) !== 'string') {
            return res.status(400).send({ msg: "Token is missing", code: "ERR_MISSING_HEADER" });
        }
        await DECODE_TOKEN(token);
        return next();
    }
    catch (err: any) {
        if (err.message === 'INVALID_TOKEN') {
            return res.status(403).send({ msg: "Token has expired", code: "ERR_TOKEN_EXPIRED" });
        }
        else {
            return res.status(500).json({ msg: "Server side error", code: err.message });
        }
    }
}

export default TOKEN_MIDDLEWARE;