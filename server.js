import express from 'express';
import * as dotenv from 'dotenv';
import routes from './routes/index.js';
import connect from './database/database.js';
import checkToken from './middlewares/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 8080

// Middlewares
// Allow to read request body
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
// Guard
app.use(checkToken);

// Routes
routes(app);

app.listen(port, async () => {
    await connect();
    console.log(`Listening on port ${port}`)
});