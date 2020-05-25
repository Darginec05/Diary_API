import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(ProfileEntity) private profileRepository: Repository<ProfileEntity>) {}

  async updateProfile(user_id: string | undefined, body: any): Promise<any> {
    return '';
  }
}
