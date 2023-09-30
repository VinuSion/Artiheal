import mongoose, { Schema, Document } from 'mongoose';

// Define your Mongoose model here

interface IExample extends Document {
  name: string;
}

const ExampleSchema = new Schema({
  name: String,
});

export default mongoose.model<IExample>('Example', ExampleSchema);
