import { GET_CONNECTION, QUERY } from "../../utils/handle-database";
import DATABASE_INSTANCE from "../../database";
import { Request, Response } from "express";
import { PoolConnection } from "mysql";
import { COMPARE_PASSWORD } from "../../utils/handle-hashing";
import { CREATE_TOKEN } from "../../utils/handle-jwt";

const SQL_QUERY = "SELECT * FROM ADMIN_USER WHERE ADMIN_EMAIL =?;"

const LOGIN = async (req: Request, res: Response) => {

    // handling pool connection

    let connection: PoolConnection | undefined;

    try {
        connection = await GET_CONNECTION(DATABASE_INSTANCE);
        let body = req.body;
        // creating new admin 


        let email = body.email;
        let password = body.password;


        console.log(email, password)

        if (!email || !password) {
            return res.status(400).json({ code: "ERR_MISSING_FIELD", msg: "Email and password are required" });
        }
        const user = await QUERY(connection, SQL_QUERY, [email]);
        if (!user || user.length === 0) {
            return res.status(400).json({ msg: "User not found", code: "ERR_USER_NOT_FOUND" })
        }

        const database_password = user[0].ADMIN_PASSWORD;

        const result = await COMPARE_PASSWORD(database_password, password);
        console.log(result)
        if (result) {
            return res.status(200).json({ msg: "Login successful", token: CREATE_TOKEN(email, '7d') })
        }

        else {
            return res.status(401).json({ msg: "Incorrect credentials", code: "ERR_INCORRECT_CREDENTIALS" })
        }

    } catch (err: any) {
        console.log("ERROR HAS HAPPENED")
        return res.status(500).json({ msg: "Server side error", code: err.message });

    }
    finally {
        if (connection) connection.release();
    }


}

export default LOGIN;