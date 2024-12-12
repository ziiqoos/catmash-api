import mongoose, { Document, Schema } from 'mongoose';

export interface ICat extends Document {
  id: string;   
  url: string;  
  score: number;
}

const CatSchema: Schema = new Schema(
  {
    id: { type: String, required: true }, 
    url: { type: String, required: true },
    score: { type: Number, required: true }
  },
  {
    collection: 'cats'
  }
);

// Export the Mongoose model
const Cat = mongoose.model<ICat>('Cat', CatSchema);
export default Cat;
