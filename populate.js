import { readFile } from 'fs/promises';

import dotenv from 'dotenv';
dotenv.config()

import connectDB from "./DB/connect.js";
import User from "./Models/User.js";

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        const jsonUsers = JSON.parse(
            await readFile(new URL('./MOCK_DATA.json', import.meta.url))
        )
        await User.create(jsonUsers);

        console.log('Success!');
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

start();




// const { readFile } = require('fs/promises');
//
// const dotenv = require('dotenv');
// dotenv.config()
//
// const connectDB =  require("./db/connect.js");
// const User =  require("./Models/User");
//
// const start = async () => {
//     try {
//         await connectDB(process.env.MONGO_URL)
//         const jsonUsers = JSON.parse(
//             await readFile(new URL('./MOCK_DATA.json', import.meta.url))
//         )
//         await User.create(jsonUsers);
//
//         console.log('Success!');
//         process.exit(0);
//     } catch (err) {
//         console.log(err);
//         process.exit(1);
//     }
// }
//
// start();