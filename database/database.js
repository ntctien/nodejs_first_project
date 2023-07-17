import mongoose from "mongoose";
import { OutputType, print } from "../helpers/print.js";
import Exception from "../exceptions/Exception.js";

const connect = async () => {
    try {
        let connection = await mongoose.connect(process.env.MONGO_URI);
        print('Connect MongoDB successfully!', OutputType.SUCCESS);
    } catch (err) {
        const { code } = err;
        if (code === 8000) {
            throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD)
        }
        else if (code === 'ENOTFOUND') {
            throw new Exception(Exception.WRONG_CONNECTION_STRING)
        }
        throw new Exception(Exception.CANNOT_CONNECT_MONGODB);
    }
}

export default connect;