import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IToken } from './token.model';

@Injectable()
export class TokenService {
  constructor(@InjectModel('Token') private readonly TokenModel: Model<IToken>) {}

  async create(tokenData: IToken): Promise<IToken> {
    const userToken = new this.TokenModel(tokenData);
    return userToken;
  }
}
