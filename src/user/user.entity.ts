import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Post } from 'src/post/post.entity';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  user_id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!: string;

  @HasMany(() => Post)
  posts!: Post[]
};