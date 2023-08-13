import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/req/create-wallet.dto';
import { UpdateWalletDto } from './dto/req/update-wallet.dto';
import { DataRes } from '../../shared/dto/res/data-res.dto';
import { Wallet } from './entities/wallet.entity';
import { JwtGuards } from '../../auth/guards/jwt.guard';
import { UsersService } from '../users/users.service';

@Controller('api/wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtGuards)
  @Post()
  async create(
    @Req() req,
    @Body() walletDto: CreateWalletDto,
  ): Promise<DataRes<Wallet>> {
    try {
      walletDto.user = req.user;
      const wallet = await this.walletService.create(walletDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: wallet,
      };
    } catch (err) {}
  }

  @UseGuards(JwtGuards)
  @Get()
  async findAll(@Req() req) {
    try {
      const user = await this.usersService.findOnlyUserById(req.user.id);
      const wallet = await this.walletService.findAll(user);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: wallet,
      };
    } catch (err) {}
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.walletService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(+id);
  }
}
