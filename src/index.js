import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import morganBody from "morgan-body";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))
morganBody(app);

app.listen(3000, () =>
  console.log("¡Aplicación de ejemplo escuchando en el puerto 3000!")
);