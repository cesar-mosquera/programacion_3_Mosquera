import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SuccessResponseDto } from '../common/dto/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const token = await this.authService.login(dto);
    return new SuccessResponseDto('Login successful', { access_token: token });
  }

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const token = await this.authService.register(dto);
    return new SuccessResponseDto('Registration successful', { access_token: token });
  }
}
