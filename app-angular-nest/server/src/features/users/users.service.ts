import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import { UserRes } from 'src/features/users/dto/res/user-res.dto';
import { Role } from '../roles/entities/role.entity';
import { ERole } from '../roles/enum/role.enum';
import { CreateUserDto } from './dto/req/create-user.dto';

@Injectable()
export class UsersService {
  private async getPasswordHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async findUser(username: string) {
    return await this.usersRepository.findOne({
      where: {
        username,
      },
      relations: ['roles'],
    });
  }

  async findRefreshToken(token: string): Promise<User> {
    const refreshToken = await this.usersRepository.findOne({
      where: {
        refreshToken: token,
      },
      select: ['id', 'refreshToken', 'refreshTokenExp'],
    });

    if (!refreshToken) {
      throw new UnauthorizedException('Token not find');
    }
    return refreshToken;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = this.usersRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async findOnlyUserById(id: number): Promise<User> {
    const user = this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async create(userData: Partial<CreateUserDto>): Promise<User> {
    const existingUser = await this.usersRepository.findOneBy({
      username: userData.username,
    });

    if (existingUser) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingUserEmail = await this.usersRepository.findOneBy({
      email: userData.email,
    });

    if (existingUserEmail) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    userData.password = await this.getPasswordHash(userData.password);

    return this.usersRepository.save({ ...userData });
  }

  async assignUserRole(userId: number, rolesRequest: Role[]): Promise<User> {
    const roles = [];

    console.log('rolesRequest', rolesRequest);

    if (!rolesRequest || rolesRequest.length === 0) {
      const userRole = await this.rolesRepository.findOne({
        where: { name: ERole.ROLE_READ },
      });
      roles.push(userRole);
    } else {
      for (const role of rolesRequest) {
        const roleEntity = await this.rolesRepository.findOne({
          where: { id: role.id },
        });
        roles.push(roleEntity);
      }
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error(`User with ID '${userId}' not found.`);
    }

    user.roles = roles;

    await this.usersRepository.save(user);
    console.log('roles', roles);

    return user;
    // return null;
  }

  async update(id: number, userDataToUpdate: Partial<User>): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...user,
      ...userDataToUpdate,
    };
    return this.usersRepository.save(updatedUser);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }

  async removeMulti(ids: string[]) {
    await this.usersRepository
      .createQueryBuilder()
      .delete()
      .where('id IN (:...ids)', { ids })
      .execute();
  }

  async validRefreshToken(
    username: string,
    refreshToken: string,
  ): Promise<UserRes> {
    const currentDate = dayjs().toString();

    const user = await this.usersRepository.findOne({
      where: {
        username: username,
        refreshToken: refreshToken,
        refreshTokenExp: MoreThanOrEqual(currentDate),
      },
    });

    if (!user) {
      return null;
    }

    const userResponse = new UserRes();
    userResponse.id = user.id;
    userResponse.firstName = user.firstName;
    userResponse.lastName = user.lastName;
    userResponse.email = user.email;

    return userResponse;
  }

  async count() {
    return this.usersRepository.count();
  }
}
