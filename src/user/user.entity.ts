import { Discussion } from 'src/discussion/discussion.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  geminiAPIkey: string | null;

  @OneToMany(() => Discussion, (discussion) => discussion.user)
  discussion: Discussion[];
}
