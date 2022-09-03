import { IsBase64, IsByteLength, IsEmail, IsEnum, max, MaxLength, min, } from 'class-validator';
import momentTz from 'moment-timezone';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Index, Unique } from 'typeorm';
import { EmployeeStatus } from '../../utils/constants/enums';

@Entity()
@Unique('employee_uk', ['email'])
export class Employees {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MaxLength(150)
  name: string;

  @Column()
  @IsEmail()
  @Index()
  @MaxLength(75)
  email: string;

  @Column({
    type: 'enum',
    enum: EmployeeStatus,
    default: EmployeeStatus.ACTIVE,
  })
  @IsEnum(EmployeeStatus)
  status: EmployeeStatus;

  @Column({
    type: 'bytea',
    nullable: true,
  })
  @IsBase64()
  @IsByteLength(10, 10000000)
  profile_picture: Buffer;

  @CreateDateColumn({
    transformer: {
      to: (value: string) => value,
      from: (value: string) => momentTz.tz(value, 'Europe/London').format(),
    },
  })
  created_at: Date;

  @UpdateDateColumn({
    transformer: {
      to: (value: string) => value,
      from: (value: string) => momentTz.tz(value, 'Europe/London').format(),
    },
  })
  modified_at: Date;
}


