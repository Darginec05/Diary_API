import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

import { UserEntity } from '../user/user.entity';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'text', nullable: true })
  title?: string

  @Column({ type: 'text', nullable: false })
  text!: string

  @Column({ type: 'text', default: null, nullable: true })
  image_uri?: string | null;
  
  @Column({ type: 'boolean', default: false, nullable: true })
  isAnonym?: boolean;

  @CreateDateColumn()
  created_at!: Date;
  
  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(type => UserEntity, author => author.posts)
  author!: UserEntity;
}
