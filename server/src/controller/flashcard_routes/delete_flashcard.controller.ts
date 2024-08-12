import { GET_CONNECTION, QUERY } from "../../utils/handle-database";
import DATABASE_INSTANCE from "../../database";
import { Request, Response } from "express";
import { PoolConnection } from "mysql";

const SQL_QUERY = "DELETE FROM CARDS WHERE ID =?;"

const DELETE_FLASHCARD = async (req: Request, res: Response) => {

    // handling pool connection

    let connection: PoolConnection | undefined;

    try {
        connection = await GET_CONNECTION(DATABASE_INSTANCE);
        let url_query = req.query;
        // deleting flashcard

        let id = url_query.id;

        if (!id) {
            return res.send(400).json({ code: "ERR_MISSING_FIELD", msg: "ID is required" });
        }

        await QUERY(connection, SQL_QUERY, [id]);

        return res.status(201).json({ msg: "Flashcard deleted" })


    } catch (err: any) {

        return res.status(500).json({ msg: "Server side error", code: err.message });


    }
    finally {
        if (connection) connection.release();
    }


}

export default DELETE_FLASHCARD;