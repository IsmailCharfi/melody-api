import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({
    update: false,
  })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
