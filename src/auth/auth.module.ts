import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtOptions } from './jwt/jwt.config';
import { User } from '@/users/entities/user.entity';

@Module({
  imports: [
    JwtModule.registerAsync({ ...jwtOptions, global: true }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}