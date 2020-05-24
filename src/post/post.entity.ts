import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm'

import { UserEntity } from 'src/user/user.entity';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column('text')
  title!: string

  @Column('text')
  text!: string

  @Column({ type: 'text', default: null })
  image_uri!: string;
  
  @Column({ type: 'boolean', default: false })
  isAnonym!: boolean;

  @ManyToOne(type => UserEntity, author => author.posts)
  author!: UserEntity;
}
