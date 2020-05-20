import { Table, Column, Model, DataType, Default, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/user/user.entity';

@Table
export class Post extends Model<Post> {
  @Column({ type: DataType.UUIDV4, allowNull: false, primaryKey: true })
  post_id!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  title!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  text!: string;

  @Default(null)
  @Column({ type: DataType.STRING, allowNull: true })
  img_url!: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isAnonymPost!: boolean;

  @Default(0)
  @Column(DataType.NUMBER)
  likes!: number;

  @ForeignKey(() => User)
  @BelongsTo(() => User, 'user_id')
  user!: User
}