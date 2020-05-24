import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert
} from 'typeorm'

import { PostEntity } from 'src/post/post.entity';

import * as bcrypt from 'bcryptjs'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'text', unique: true })
  username!: string

  @Column({ type: 'text', unique: true })
  email!: string

  @Column({ type: 'text' })
  password!: string;

  @OneToMany(type => PostEntity, post => post.author, { cascade: true })
  posts!: PostEntity[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    const isCompared = await bcrypt.compare(attempt, this.password);
    return isCompared;
  }
}
