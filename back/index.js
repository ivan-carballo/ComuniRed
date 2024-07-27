import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongo.js";
import router from "./routes/router.js";
import cors from "cors"
import bodyParser from 'body-parser'


dotenv.config();
const CONTAINER_PORT = 3000;

const app = express();
app.use(cors())
app.use(express.json()); 

connectDB();

app.use(express.static("public")); // permite mostrar archivos en la carpeta public

app.set("views","./src/views");

app.use(express.json({ limit: '50mb'})); // permite leer el body de llamadas POST y PUT tipo JSON
app.use(express.urlencoded({ limit: '50mb', extended:true})); // permite leer el body de llamadas POST y PUT tipo URL Encoded

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));


app.use("/", router);

app.listen(CONTAINER_PORT ,()=>{
    console.log("Aplicacion en marcha en el puerto "+process.env.APP_PORT);
})

