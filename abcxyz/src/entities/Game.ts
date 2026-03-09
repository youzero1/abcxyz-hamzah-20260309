import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('games')
export class Game {
  @PrimaryColumn('text')
  id!: string;

  @Column({ type: 'text' })
  playerX!: string;

  @Column({ type: 'text' })
  playerO!: string;

  @Column({ type: 'text', nullable: true })
  winner!: string | null;

  @Column({ type: 'text' })
  moves!: string;

  @Column({ type: 'datetime', nullable: true })
  completedAt!: Date | null;

  @CreateDateColumn()
  createdAt!: Date;
}
