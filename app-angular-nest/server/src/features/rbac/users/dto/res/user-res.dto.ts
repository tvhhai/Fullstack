import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';

@Exclude()
export class UserRes {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  roles: string[];

  @Expose()
  @IsEmail()
  email: string;
}
