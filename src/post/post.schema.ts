import { Schema, Document, } from 'mongoose';

export const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
      maxlength: 100,
    },
    text: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      default: null,
      required: false,
    },
    isAnonym: {
      type: Boolean,
      required: false,
      default: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true, strict: true },
);

export interface IPost extends Document {
  id: string;
  title?: string;
  text: string;
  imgUrl: string | null;
  isAnonym: boolean;
  likes: number;
  postedBy: string
}
