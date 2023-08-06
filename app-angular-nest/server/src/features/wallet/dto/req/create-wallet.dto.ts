import { IsNotEmpty } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty()
  amount: number;
}
