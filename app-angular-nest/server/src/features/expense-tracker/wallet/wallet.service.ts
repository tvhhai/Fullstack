import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/req/create-wallet.dto';
import { UpdateWalletDto } from './dto/req/update-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';
import { User } from '../../rbac/users/entities/user.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  create(walletDto: Partial<CreateWalletDto>): Promise<Wallet> {
    return this.walletRepository.save(walletDto);
  }

  findAll(user: User) {
    return this.walletRepository.find({
      where: {
        user: { id: user.id },
      },
    });
  }

  findOneById(id: number) {
    return this.walletRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, walletDto: UpdateWalletDto) {
    const wallet = await this.walletRepository.findOne({
      where: { id },
    });

    const updatedUser = {
      ...wallet,
      ...walletDto,
    };

    return this.walletRepository.save(updatedUser);
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
