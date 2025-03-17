import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}

  async getUserByLogin(login: string) {
    return await this.userRepository.findOneBy({ login });
  }
  
  async login(body: AuthDto) {
    const { login, password } = body;
    
    const userIsExist = await this.getUserByLogin(login);
    if(!userIsExist) {
      throw new BadRequestException("Пользователь не зарегистрирован")
    };

    const isMatch = await bcrypt.compare(password, userIsExist.password);
    if(!isMatch) {
      throw new BadRequestException("Неверный логин или пароль");
    };

    // формируем accessToken и refreshToken
    const accessToken = this.generateAccessToken({ id: userIsExist.id, login: userIsExist.login });
    const refreshToken = this.generateRefreshToken({ id: userIsExist.id, login: userIsExist.login });

    return { accessToken, refreshToken };
  };


  
  async register(body: AuthDto) {
    const userIsExist = await this.getUserByLogin(body.login);
    if(userIsExist) {
      throw new BadRequestException("Пользователь не зарегистрирован")
    };

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const createdUser = this.userRepository.create({
      login: body.login,
      password: hashedPassword
    });
    console.log({ createdUser });
    
    await this.userRepository.save(createdUser);

    // Генерация токенов
    const accessToken = this.generateAccessToken({ userId: createdUser.id, login: createdUser.login });
    const refreshToken = this.generateRefreshToken({ userId: createdUser.id, login: createdUser.login });

    return { accessToken, refreshToken };
  };



  // Обновление токенов
  async refreshTokens(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      // Верификация refreshToken
      const payload = this.jwtService.verify(refreshToken);

      // Генерация новых токенов
      const accessToken = this.generateAccessToken({ userId: payload.userId, login: payload.login });
      const newRefreshToken = this.generateRefreshToken({ userId: payload.userId });

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    };
  };
  

  // Генерация accessToken
  private generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, { expiresIn: "15m" });
  };

  // Генерация refreshToken
  private generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, { expiresIn: '7d' }); // Время жизни refreshToken
  };
};
