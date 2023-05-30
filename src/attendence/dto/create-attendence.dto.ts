import { IsAlpha, IsBoolean, IsString } from 'class-validator';

export class CreateAttendenceDto {
  @IsBoolean()
  present: string;

  @IsBoolean()
  absent: string;

  @IsBoolean()
  half: string;

  @IsString()
  student_id: string;

  @IsString()
  attendanceKey: string;
}
