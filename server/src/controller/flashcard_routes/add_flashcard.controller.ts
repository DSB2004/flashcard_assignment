import { GET_CONNECTION, QUERY } from "../../utils/handle-database";
import DATABASE_INSTANCE from "../../database";
import { Request, Response } from "express";
import { PoolConnection } from "mysql";

const SQL_QUERY = "INSERT INTO CARDS (ID,QUES,ANS) VALUES (?,?,?);"

const ADD_FLASHCARD = async (req: Request, res: Response) => {

    // handling pool connection

    let connection: PoolConnection | undefined;

    try {
        connection = await GET_CONNECTION(DATABASE_INSTANCE);
        let body = req.body;
        // creating new flashcard
        let ques = body.ques;
        let ans = body.ans;

        if (!ques || !ans) {
            return res.send(400).json({ code: "ERR_MISSING_FIELD", msg: "Ques and ans are required" });
        }

        await QUERY(connection, SQL_QUERY, [ques, ans]);

        return res.status(201).json({ msg: "New flashcard created" })


    } catch (err: any) {

        if (err.message === "ERR_DUPLICATE_VALUE") {
            return res.status(400).json({ code: err.message, msg: "Flashcard already exist" });
        }
        else {
            return res.status(500).json({ msg: "Server side error", code: err.message });
        }

    }
    finally {
        if (connection) connection.release();
    }


}

export default ADD_FLASHCARD;