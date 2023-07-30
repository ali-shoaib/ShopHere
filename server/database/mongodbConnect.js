import mongoose from 'mongoose';
import {MONGO_URI} from '../config/index.js';
import color from 'colors';

const dbconnect = async () => {
    await mongoose.connect(MONGO_URI,{
        useNewUrlParser:true, 
        useUnifiedTopology: true,
    })
    .then(() => console.log('database connected.'.bgYellow.black))
    .catch(err=>console.log(err));
}

export default dbconnect;