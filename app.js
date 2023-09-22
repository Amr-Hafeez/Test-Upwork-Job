const express = require("express");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const connectDB = require("./DB/connect");
const errorHandlerMiddleWare = require("./Middlewares/ErrorHandler");
const AuthRoutes = require("./Routes/AuthRoutes");
require("express-async-errors");

const app = express();

// Configuration
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

// Routes
app.use('/api/v1', AuthRoutes);

// Error Middleware
app.use(errorHandlerMiddleWare);

// Mongoose Setup
const port = process.env.PORT || 5001;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server on port: ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
