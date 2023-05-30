import { IsAlpha, IsBoolean, IsEmail, IsNumber, IsString, isBoolean, isNumber } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsAlpha()
  mobile: string;

  @IsNumber()
  age: number;

  @IsString()
  user_status: string;

  @IsString()
  batch_id:string;
}


