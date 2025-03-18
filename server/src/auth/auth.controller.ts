import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiSecurity } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('login')
  async login(@Body() body: AuthDto) {
    return this.authService.login(body);
  };

  @Post('sign-up')
  async register(@Body() body: AuthDto) {
    return this.authService.register(body);
  };

  @Post('refresh')
  async refreshTokens(@Body() body: string) {
    return this.authService.refreshTokens(body);
  }
}
