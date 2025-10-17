import express from 'express';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import dotenv from 'dotenv';
import contactsRouter from './routers/contacts.js';

dotenv.config();

export const setupServer = () => {
    const app = express();

    app.use(cors());

    app.use(pinoHttp({
        transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(contactsRouter);

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};