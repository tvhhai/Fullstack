import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as randomToken from 'rand-token';
import * as dayjs from 'dayjs';

export class RegistrationReqModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export class RegistrationRespModel {
  successStatus: boolean;
  message: string;
}
export class CurrentUser {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
}
@Injectable()
export class UsersService {
  // private readonly users = [
  //   {
  //     id: 1,
  //     username: 'john',
  //     password: 'changeme',
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //   },
  //   {
  //     id: 2,
  //     username: 'maria',
  //     password: 'guess',
  //     firstName: 'Maria',
  //     lastName: 'Doe',
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //   },
  // ];

  private async getPasswordHash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<User | undefined> {
    // return this.users.find((user) => user.username === username)
    return;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private async registrationValidation(
    regModel: RegistrationReqModel,
  ): Promise<string> {
    if (!regModel.email) {
      return "Email can't be empty";
    }

    const emailRule =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailRule.test(regModel.email.toLowerCase())) {
      return 'Invalid email';
    }

    const user = await this.usersRepository.findOneBy({
      email: regModel.email,
    });
    if (user != null && user.email) {
      return 'Email already exist';
    }

    if (regModel.password !== regModel.confirmPassword) {
      return 'Confirm password not matching';
    }
    return '';
  }

  async registerUser(
    regModel: RegistrationReqModel,
  ): Promise<RegistrationRespModel> {
    const result = new RegistrationRespModel();

    const errorMessage = await this.registrationValidation(regModel);
    if (errorMessage) {
      result.message = errorMessage;
      result.successStatus = false;

      return result;
    }

    const newUser = new User();
    newUser.firstName = regModel.firstName;
    newUser.lastName = regModel.lastName;
    newUser.email = regModel.email;
    newUser.password = await this.getPasswordHash(regModel.password);

    await this.usersRepository.insert(newUser);
    result.successStatus = true;
    result.message = 'success';
    return result;
  }

  public async validateUserCredentials(
    username: string,
    password: string,
  ): Promise<CurrentUser> {
    const user = await this.usersRepository.findOneBy({ username: username });

    if (user == null) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return null;
    }
    const currentUser = new CurrentUser();
    currentUser.userId = user.id;
    currentUser.firstName = user.firstName;
    currentUser.lastName = user.lastName;
    currentUser.email = user.email;

    return currentUser;
  }

  public async getJwtToken(user: CurrentUser): Promise<string> {
    const payload = {
      ...user,
    };
    return this.jwtService.signAsync(payload);
  }

  public async getRefreshToken(id: number): Promise<string> {
    const userDataToUpdate = {
      refreshToken: randomToken.generate(16),
      refreshTokenExp: dayjs().day(1).format('YYYY/MM/DD'),
    };

    await this.usersRepository.update(id, userDataToUpdate);
    return userDataToUpdate.refreshToken;
  }

  public async validRefreshToken(
    email: string,
    refreshToken: string,
  ): Promise<CurrentUser> {
    const currentDate = dayjs().day(1).format('YYYY/MM/DD');
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
        refreshToken: refreshToken,
        refreshTokenExp: MoreThanOrEqual(currentDate),
      },
    });

    if (!user) {
      return null;
    }

    const currentUser = new CurrentUser();
    currentUser.userId = user.id;
    currentUser.firstName = user.firstName;
    currentUser.lastName = user.lastName;
    currentUser.email = user.email;

    return currentUser;
  }
  //===========================================================

  findUser(username: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }

  async updateUser(id: number, userDataToUpdate: Partial<User>): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      // Xử lý trường hợp không tìm thấy người dùng
      throw new Error('User not found');
    }

    const updatedUser = {
      ...user,
      ...userDataToUpdate,
    };

    return this.usersRepository.save(updatedUser);
  }

  // async getCurrentUser(): Promise<User> {
  //   // return {
  //   //
  //   // }
  // }
}
