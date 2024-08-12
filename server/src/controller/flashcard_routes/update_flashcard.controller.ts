import { GET_CONNECTION, QUERY } from "../../utils/handle-database";
import DATABASE_INSTANCE from "../../database";
import { Request, Response } from "express";
import { PoolConnection } from "mysql";

const SQL_QUERY = "UPDATE CARDS SET QUES=? , ANS=? WHERE ID= ?;"

const UPDATE_FLASHCARD = async (req: Request, res: Response) => {

    // handling pool connection

    let connection: PoolConnection | undefined;

    try {
        connection = await GET_CONNECTION(DATABASE_INSTANCE);
        let body = req.body;
        // updating existing flashcard
        let id = body.id;
        let ques = body.ques;
        let ans = body.ans;

        if (!ques || !ans || !id) {
            return res.send(400).json({ code: "ERR_MISSING_FIELD", msg: "Fields are required" });
        }

        await QUERY(connection, SQL_QUERY, [ques, ans, id]);

        return res.status(201).json({ msg: "Flashcard updated" })


    } catch (err: any) {


        return res.status(500).json({ msg: "Server side error", code: err.message });


    }
    finally {
        if (connection) connection.release();
    }


}

export default UPDATE_FLASHCARD;