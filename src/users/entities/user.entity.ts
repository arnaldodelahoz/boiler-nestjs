import { Role } from '../../roles/entities/role.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({name:"last_name"})
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne((type) => Role)
  @JoinColumn({name:"role_id"})
  role: Role;

}
