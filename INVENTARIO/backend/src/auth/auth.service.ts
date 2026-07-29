import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<string> {
    const user = await this.usersService.findByUsername(dto.username!);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(dto.password!, user.password!);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { id: user.id, username: user.username };
    return this.jwtService.sign(payload);
  }

  async register(dto: CreateUserDto): Promise<string> {
    const user = await this.usersService.create(dto);
    if (!user) throw new UnauthorizedException('Failed to register user');

    const payload = { id: user.id, username: user.username };
    return this.jwtService.sign(payload);
  }
}
