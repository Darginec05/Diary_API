import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { UserEntity } from 'src/user/user.entity';

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', default: null, nullable: true })
  avatar?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @OneToOne(type => UserEntity, user => user.profile)
  user!: UserEntity;
};