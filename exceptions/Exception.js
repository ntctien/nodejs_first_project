import { OutputType, print } from "../helpers/print.js";

export default class Exception extends Error {
    static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username and password.";
    static WRONG_CONNECTION_STRING = "Wrong server name/connection string.";
    static CANNOT_CONNECT_MONGODB = "Cannot connect to MongoDB.";
    static USER_EXISTED = "User already exists.";
    static CANNOT_REGISTER_USER = "Cannot register user.";
    static WRONG_EMAIL_OR_PASSWORD = "Wrong email or password.";
    static CANNOT_GET_STUDENT = "Cannot get student.";
    
    constructor(message) {
        //Call constructor of parent class
        super(message);

        print(message, OutputType.ERROR);
    }
}