import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseGuards,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { AttendenceService } from './attendence.service';
import { CreateAttendenceDto } from './dto/create-attendence.dto';
import { JwtGuard } from '../auth/guards';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@UseGuards(JwtGuard)
@Controller('attendance')
export class AttendenceController {
  constructor(private readonly attendenceService: AttendenceService) {}

  @UseFilters(HttpExceptionFilter)
  @Post('/markAttendance')
  async create(
    @Body() createAttendenceDto: CreateAttendenceDto,
    @Res() res,
    @GetUser() user: any,
  ) {
    try {
      const isAlreadyMarked=await this.attendenceService.isAttendanceAlreadyMarked(user._id);
      if (isAlreadyMarked) {
        return res.json({
          success: false,
          message: 'attendance  Already Marked',
        });
      }
      const isKeyValid = await this.attendenceService.checkIsValid(
        createAttendenceDto.attendanceKey,
      );
      if (isKeyValid) {
        const attendance = await this.attendenceService.create(
          createAttendenceDto,
          user._id,
        );
        if (attendance) {
          return res.json({
            success: true,
            message: 'attendance  tracked successfully',
          });
        } else {
          return res.json({
            success: false,
            message: 'Failed to track attendance',
          });
        }
      } else {
        return res.status(HttpStatus.BAD_GATEWAY).json({
          success: false,
          message: 'its seems the key is expired',
        });
      }
    } catch (error) {
      return res.status(HttpStatus.FORBIDDEN).json({
        success: false,
        message: 'its seems the key is expired',
      });
    }
  }
}
