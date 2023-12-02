import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import helmet from 'helmet';
import dbConnection from './dbConfig/index.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8800;

dbConnection();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
}
); 