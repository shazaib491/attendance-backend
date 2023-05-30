import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  NotFoundException,
  HttpStatus,
  UseFilters,
  HttpException,
  ForbiddenException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Response } from 'express';
import { MongoExceptionFilter } from './error';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

// 1323456789

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //method for registering the user
  @Post('/signup')
  @UseFilters(HttpExceptionFilter)
  async signup(@Body() createAuthDto: CreateAuthDto, @Res() res: Response) {
    console.log(
      '======================================Starting of SingIn User=====================================',
    );
    try {
      const isUserExist = await this.authService.findOne(createAuthDto.email);
      if (isUserExist) {
        throw new HttpException('user Already exists ', HttpStatus.CONFLICT);
      }
      const user = await this.authService.signup(createAuthDto);
      if (user) {
        return res.json({
          success: true,
          message: 'user created successfully',
        });
      }
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        ...error,
      });
    }
    console.log(
      '======================================Ending of SingIn User=====================================',
    );
  }

  //method for login the user
  @Post('/signIn')
  @UseFilters(MongoExceptionFilter)
  @UseFilters(HttpExceptionFilter)
  async singIn(@Body() createAuthDto: CreateAuthDto, @Res() res: Response) {
    console.log(
      '======================================Starting of SingIn User=====================================',
    );
    try {
      const user = await this.authService.findOne(createAuthDto.email);
      if (!user) {
        throw new HttpException('Credentials incorrect', HttpStatus.FORBIDDEN);
      }
      const pwdMatch = await this.authService.comparePassword(
        user.password,
        createAuthDto.password,
      );
      if (!pwdMatch) {
        throw new ForbiddenException('Credentials incorrect');
      }
      const userInfo = await this.authService.signToken(
        user._id,
        user.email,
        user.user_type,
        user.username,
      );
      res.status(HttpStatus.ACCEPTED).json({
        success: true,
        message: 'user signIn successfully',
        ...userInfo,
      });
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        ...error,
      });
    }
    console.log(
      '======================================Ending of SingIn User=====================================',
    );
  }
}
