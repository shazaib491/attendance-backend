import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schema/auth.scehma';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectModel(Auth.name) private readonly AuthModel: Model<Auth>,
  ) {}

  //method for adding the user
  async signup(createAuthDto: CreateAuthDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createAuthDto.password, saltOrRounds);
    const { username, email, password, age, user_status, mobile, batch_id } =
      createAuthDto;
    const user = new this.AuthModel({
      username,
      email,
      password: hash,
      age,
      user_status,
      mobile,
      batch_id: new mongoose.Types.ObjectId(batch_id),
    });
    return user.save();
  }

 

  //method for getting single user
  findOne(email: string) {
    return this.AuthModel.findOne({ email }).lean();
  }

  //method for comparing the password
  async comparePassword(currentPassword: string, receivedPassword: string) {
    const result = await bcrypt.compare(receivedPassword,currentPassword,);
    return result
  }


  //method for generating the token
  async signToken(
    userId: any,
    email: string,
    user_type: string,
    username:string
    
  ): Promise<{
    access_token: string;
    expiresIn: number;
    userId: string;
    user_type: string;
    username:string;
    email:string  
  }> {
    const payload = { sub: userId, email };
    const secret = this.configService.get('JWT_SECRET');
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: secret,
    });
    return {
      access_token: token,
      expiresIn: 3600,
      userId: userId,
      user_type: user_type,
      username,
      email
    };
  }
}
