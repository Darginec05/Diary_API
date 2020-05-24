import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm'

import { PostEntity } from 'src/post/post.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'text', unique: true })
  username!: string

  @Column({ type: 'text', unique: true })
  email!: string

  @Column('text')
  password!: string;

  @OneToMany(type => PostEntity, post => post.author, { cascade: true })
  posts!: PostEntity[]
}
