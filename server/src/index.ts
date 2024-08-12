import app from "./app";
import DATABASE_INSTANCE from "./database";
import { PORT } from "./env";

app.listen(PORT, async () => {
    console.log(`Running on ${PORT}`)
})
