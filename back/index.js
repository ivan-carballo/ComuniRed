import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongo.js";
import router from "./routes/router.js";
import cors from "cors"
import bodyParser from 'body-parser'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'


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


// Emular __dirname usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Configurar almacenamiento de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const ext = path.extname(file.originalname);
      cb(null, `${timestamp}${ext}`);
    }
  });
  
  const upload = multer({ storage: storage });
  

  // Middleware para servir archivos estáticos desde la carpeta uploads
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  

  // Ruta para subir archivos
  app.post('/upload', upload.single('file'), (req, res) => {
    try {
      const filePath = `/uploads/${req.file.filename}`;
      res.send({ message: 'Archivo subido exitosamente', filePath: filePath });
    } catch (error) {
      res.status(400).send({ error: 'Error al subir el archivo' });
    }
  });


  // Ruta para eliminar archivos
  app.delete('/upload/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error al eliminar el archivo:', err);
        return res.status(500).send({ error: 'Error al eliminar el archivo' });
      }
      res.send({ message: 'Archivo eliminado exitosamente' });
    });
  });



app.use("/", router);

app.listen(CONTAINER_PORT ,()=>{
    console.log("Aplicacion en marcha en el puerto "+process.env.APP_PORT);
})

