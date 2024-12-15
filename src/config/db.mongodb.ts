import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { logger } from '../utils/logger';

dotenv.config();

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

// Validate that all necessary environment variables are present
if (!DB_USERNAME || !DB_PASSWORD || !DB_HOST || !DB_PORT || !DB_NAME) {
  throw new Error('Missing required environment variables for database connection.');
}

export const connect = async (): Promise<void> => {
  try {
    const uri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?authSource=admin`;
    await mongoose.connect(uri, {});

    console.log('Successfully connected to :', uri);
    logger.info(`Successfully connected to DB`);

  } catch (error) {
    console.error('Database connection failed. Exiting now...');
    console.error(error);
    logger.info(`Database connection failed : ${error}`);
  }
};
