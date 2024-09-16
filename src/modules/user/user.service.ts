import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async register(email: string, name: string, password: string) {
    const users = await this.prisma.user.findMany();

    if (users.find((user) => user.email === email)) {
      throw new HttpException('User already in use', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const payload = { email: user.email, id: user.id, name: user.name };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
