import { GET_CONNECTION, QUERY } from "../../utils/handle-database";
import DATABASE_INSTANCE from "../../database";
import { Request, Response } from "express";
import { PoolConnection } from "mysql";

const SQL_QUERY = "SELECT * FROM CARDS LIMIT 10 OFFSET ?;";

const GET_FLASHCARDS = async (req: Request, res: Response) => {
    let connection: PoolConnection | undefined;

    try {
        connection = await GET_CONNECTION(DATABASE_INSTANCE);

        // Extract page from query parameters
        const url_query = req.query;
        let page = parseInt(url_query.page as string, 10);

        if (isNaN(page) || page <= 0) {
            return res.status(400).json({ code: "ERR_MISSING_FIELD", msg: "Page is required and must be a positive number" });
        }

        // Calculate the offset based on the page number
        const offset = (page - 1) * 10;

        // Execute the SQL query with the calculated offset
        const result = await QUERY(connection, SQL_QUERY, [offset]);

        return res.status(200).json({ msg: "Flashcard list", cards: result });

    } catch (err) {
        // Handle and return error response
        console.error('Server error:', err);
        return res.status(500).json({ msg: "Server side error", code: "ERR_SERVER_ERROR" });

    } finally {
        if (connection) connection.release();
    }
}

export default GET_FLASHCARDS;
