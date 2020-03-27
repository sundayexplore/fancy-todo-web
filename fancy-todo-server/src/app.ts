import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';

if (process.env.NODE_ENV !== 'production') {
  config();
}

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://mongodb:27017/fancy-todo-api', {
  useNewUrlParser: true
});

app.listen(port, () => {
  console.log(`Sunday's API is running on port ${port}!`);
});

export default app;
