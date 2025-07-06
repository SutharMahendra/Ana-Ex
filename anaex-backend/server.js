import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './Routes/Auth.js';
import uploadRoute from './Routes/uploadRoute.js';
import DataRoute from './Routes/DataRoute.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// mongoDB connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('mongoDB is connected'))
    .catch((error) => console.error('failed to connect', error));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/data', uploadRoute);
app.use('/api/chart', DataRoute);

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server running on port ${PORT}`));