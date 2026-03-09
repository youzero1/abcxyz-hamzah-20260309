import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn('text')
  id!: string;

  @Column({ type: 'text', unique: true })
  username!: string;

  @Column({ type: 'text', default: 'default' })
  avatar!: string;

  @Column({ type: 'integer', default: 0 })
  wins!: number;

  @Column({ type: 'integer', default: 0 })
  losses!: number;

  @Column({ type: 'integer', default: 0 })
  draws!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
