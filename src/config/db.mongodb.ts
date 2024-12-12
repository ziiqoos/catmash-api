import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

// Validate that all necessary environment variables are present
if (!DB_USERNAME || !DB_PASSWORD || !DB_HOST || !DB_PORT || !DB_NAME) {
  throw new Error('Missing required environment variables for database connection.');
}

export const connect = async (): Promise<void> => {
  try {
    const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?authSource=admin`;
    await mongoose.connect(uri, {});

    console.log('Successfully connected to :',uri);
  } catch (error) {
    console.error('Database connection failed. Exiting now...');
    console.error(error);
    process.exit(1);
  }
};
