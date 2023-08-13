import { IsNotEmpty } from 'class-validator';
import { User } from '../../../users/entities/user.entity';

export class CreateWalletDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  nameWallet: string;

  @IsNotEmpty()
  active: boolean;

  user: User;
}
