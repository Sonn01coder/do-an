import express from  "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/ViewEngine";
import initWebRoutes from "./route/web";
import {connectDB} from "./config/connectDB";
import initAPIRoutes from "./route/api";
import { createJWT, verifyToken } from "./migrations/JWTAction";

//read file env
require('dotenv').config();

const cors = require('cors');

let app = express();

//config app

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

configViewEngine(app)


//test jwt
// createJWT()
//init web routes
initWebRoutes(app)

//init api routes
initAPIRoutes(app)

connectDB();

//port === undefined => port = 6969
let port = process.env.PORT || 6969

app.listen(port , () => {
    console.log("Back end Nodejs is running on port: ", port);
})