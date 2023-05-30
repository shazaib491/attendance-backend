import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { CreateAttendenceDto } from './dto/create-attendence.dto';
import { UpdateAttendenceDto } from './dto/update-attendence.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Attendance } from './schema/attendence.schema';
import mongoose, { Model } from 'mongoose';
import { Task } from 'src/task/schema/task.model';

import moment from 'moment';

@Injectable()
export class AttendenceService {
  constructor(
    @InjectModel(Attendance.name)
    private readonly AttendanceModel: Model<Attendance>,
    private readonly logger: Logger,
    @InjectModel(Task.name) private readonly TaskModel: Model<Task>,
  ) {}

  //method for mark the attendance
  public async create(
    createAttendenceDto: CreateAttendenceDto,
    userId: string,
  ) {
    const present = createAttendenceDto?.present ?? false;
    return this.AttendanceModel.create({
      present: present,
      student_id: new mongoose.Types.ObjectId(userId),
    });
  }

  //method for check key is valid or not
  public async checkIsValid(attendanceKey: string) {
    return this.TaskModel.findOne({ loginKey: attendanceKey });
  }

  public async isAttendanceAlreadyMarked(userId: string) {
    try {
      let start_date: any = '';
      let end_date: any = '';
      start_date = new Date();
      start_date = start_date.setHours(0, 0, 0, 0);
      start_date = new Date(start_date);
      end_date = new Date();
      end_date = end_date.setHours(23, 59, 59, 999);
      end_date = new Date(end_date);
      const condition = {
        $match: {
          $and: [
            { createdAt: { $gte: start_date, $lt: end_date } },
            {
              student_id: new mongoose.Types.ObjectId(userId),
            },
            { present: true },
          ],
        },
      };
      const countIsMarked = { $count: 'isAttendanceTrack' };
      const result = await this.AttendanceModel.aggregate([
        condition,
        countIsMarked,
      ]);
      if (result[0]?.isAttendanceTrack) {
        return result[0]?.isAttendanceTrack;
      } else {
        return 0;
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
