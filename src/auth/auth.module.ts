import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { Auth, AuthSchema } from './schema/auth.scehma';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';


@Module({
  imports: [MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  JwtModule.register({
    global: true,
    secret: "sdsdfjkfdsjk",
    signOptions: { expiresIn: '60s' },
  }),
],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
})
export class AuthModule {}
