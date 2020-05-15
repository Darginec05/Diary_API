import { Schema, Document, Types } from 'mongoose';

export const TokenSchema = new Schema({
  token: { type: String, required: true },
  userId: { type: Types.ObjectId, required: true, ref: 'User' },
});

export interface IToken extends Document {
  token: string;
  userId: string;
}