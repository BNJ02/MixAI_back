import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('discussion')
export class Discussion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.discussion, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'jsonb' })
  history: Array<{ role: string; parts: Array<{ text: string }> }>;
}
