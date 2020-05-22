import { Table, Column, Model, DataType, Default, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/user/user.entity';

@Table
export class Post extends Model<Post> {
  @Column({ type: DataType.UUID, allowNull: false, primaryKey: true })
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
  @Column(DataType.INTEGER)
  likes!: number;

  @ForeignKey(() => User)
  user_fk!: string;

  @BelongsTo(() => User, 'user_id')
  user!: User
}