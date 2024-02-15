import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Code {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  alphabeticCode: string;

  @Column({ type: 'text', nullable: true })
  entity: string;

  @Column({ type: 'text', nullable: true })
  currency: string;

  @Column()
  isEnable: boolean;
}
