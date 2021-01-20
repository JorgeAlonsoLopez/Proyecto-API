import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import morganBody from "morgan-body";
import mongoose from "mongoose";

import models from './models';
import routes from './routes';
import passport from './services/passport';

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))
morganBody(app);

app.use(passport.initialize());

app.use('/songs', routes.song);
app.use('/lists', routes.list);
app.use('/auth', routes.auth);


mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  
    if (err) {
      console.log(`Error de conexión a la base de datos: ${JSON.stringify(err)}`);
    } else {
      console.log(`Conexión correcta a la base de datos en la URI ${process.env.DB_URI}`);
      app.listen(process.env.PORT, () =>
        console.log(
          `¡Aplicación de ejemplo escuchando en el puerto ${process.env.PORT}!`
        )
      );
    }
  
  });

