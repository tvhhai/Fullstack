import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { JwtGuards } from "../../auth/guards/jwt.guards";

export class RegistrationReqModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export class CurrentUser {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
}
@Controller('api/')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('registration')
  async registerUser(@Body() reg: RegistrationReqModel) {
    return await this.usersService.registerUser(reg);
  }






  @Get('fav-movies')
  @UseGuards(AuthGuard('jwt'))
  async movies(@Req() req) {
    return ['Avatar', 'Avengers'];
  }

  @Get('refresh-tokens')
  @UseGuards(AuthGuard('refresh'))
  async regenerateTokens(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.usersService.getJwtToken(req.user as CurrentUser);
    const refreshToken = await this.usersService.getRefreshToken(
      req.user.userId,
    );
    const secretData = {
      token,
      refreshToken,
    };

    res.cookie('auth-cookie', secretData, { httpOnly: true });
    return { msg: 'success' };
  }
}
