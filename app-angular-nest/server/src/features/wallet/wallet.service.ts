import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/req/create-wallet.dto';
import { UpdateWalletDto } from './dto/req/update-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  create(walletDto: CreateWalletDto): Promise<Wallet> {
    return this.walletRepository.save(walletDto);
  }

  findAll(user: User) {
    return this.walletRepository.find({
      where:{
        user: { id: user.id },
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
