import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { TaskService } from './task/task.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly taskService: TaskService,
  ) {}

  @Get('/attendanceKey')
  @UseFilters(HttpExceptionFilter)
  async getAttendanceKey(@Res() res) {
    try {
      const key = await this.taskService.getAttendanceKey();
      if (key) {
        return res.json({
          success: true,
          message: 'key fetched successfully',
          ...key,
        });
      } else {
        throw new HttpException('something went wrong', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {}
    throw new HttpException('something went wrong', HttpStatus.BAD_REQUEST);
  }
}

