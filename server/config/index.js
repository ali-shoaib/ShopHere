import {config} from 'dotenv';

config();

const PORT = process.env.PORT || 8080;
const DEV = process.env.DEV_MODE;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

export {PORT,DEV,MONGO_URI,JWT_SECRET,REFRESH_TOKEN,ACCESS_TOKEN};