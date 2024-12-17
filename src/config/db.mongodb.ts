import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { logger } from '../utils/logger';

dotenv.config();
const { MONGODB_URI } = process.env;

// Validate that all necessary environment variables are present
if (!MONGODB_URI) {
  throw new Error('Missing required environment variables for database connection.');
}

export const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI as string, {});
    logger.info(`Successfully connected to DB`);
  } catch (error) {
    logger.info(`Database connection failed : ${error}`);
  }
};
