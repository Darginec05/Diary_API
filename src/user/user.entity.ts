import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  OneToOne,
  JoinColumn
} from 'typeorm'

import { PostEntity } from '../post/post.entity';

import * as bcrypt from 'bcryptjs'
import { ProfileEntity } from 'src/profile/profile.entity';

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

  @OneToOne(type => ProfileEntity, profile => profile.user)
  @JoinColumn()
  profile!: ProfileEntity

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    const isCompared = await bcrypt.compare(attempt, this.password);
    return isCompared;
  }
}
