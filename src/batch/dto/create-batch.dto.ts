import {
  IsArray,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateBatchDto {
  // @IsString()
  // student_name: string;

  @IsString()
  main_language: string;

  @IsArray()
  techs: string[];

  @IsNumber()
  course_name: string;

  // @IsNumber()
  // latitude: number;

  // @IsNumber()
  // longitude: number;

  @IsString()
  teacher_name: string;

  @IsString()
  class_name: string;
}
