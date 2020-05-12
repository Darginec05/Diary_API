import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    maxlength: 100
  },
  text: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    default: null,
    required: false
  }
}, { timestamps: true })

export interface IPost extends mongoose.Document {
  id: string;
  title?: string;
  text: string;
  imgUrl: string | null;
}