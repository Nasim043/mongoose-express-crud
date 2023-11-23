import app from "./app"
import mongoose from 'mongoose';
import config from "./app/config"

async function server() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log("connected to MongoDB");

        app.listen(config.port, () => {
            console.log(`App is listening on port ${config.port}`)
        })
    } catch (error) {
        console.log(error);
    }
}
server();