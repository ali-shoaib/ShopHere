import express from 'express';
import { PORT,DEV } from './config/index.js';
import connectDB from './database/mongodbConnect.js';
import color from 'colors';
import router from './routes/index.js';
import cors from 'cors';
const app = express();

// database connect
connectDB();

//middlewares
app.use(
    cors({
        origin: function (origin, callback) {
          return callback(null, true);
        },
        optionsSuccessStatus: 200,
        credentials: true,
    })
);
app.use(express.json());

// rest api
app.use("/api/v1",router);

app.listen((PORT),() => {
    console.log(`${DEV} server listening on ${PORT}`.bgBlue.white);
});