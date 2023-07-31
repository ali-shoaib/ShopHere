import express from 'express';
import { PORT,DEV } from './config/index.js';
import connectDB from './database/mongodbConnect.js';
import color from 'colors';
import router from './routes/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/errorHandler.js';
const app = express();

app.use(cookieParser());

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

app.use(errorHandler);

app.listen((PORT),() => {
    console.log(`${DEV} server listening on ${PORT}`.bgBlue.white);
});