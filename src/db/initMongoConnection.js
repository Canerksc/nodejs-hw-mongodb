import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;

const connectionString = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

export const initMongoConnection = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log('Mongo başarılı şekilde bağlandı!');
  } catch (e) { 
    console.error('Mongo bağlantısı sağlanamadı:', e.message);
    process.exit(1);
  }
};