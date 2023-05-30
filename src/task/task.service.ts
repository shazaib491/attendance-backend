import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Task } from './schema/task.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(
    @InjectModel(Task.name) private readonly TaskModel: Model<Task>,
  ) {}
  // 0  00  10 * * 1-5
  //sec min hr day month week
  //   * * * * * *
  // | | | | | |
  // | | | | | day of week
  // | | | | months
  // | | | day of month
  // | | hours
  // | minutes
  // seconds (optional)
  @Cron('* * 10 * * *')
  async handleCron() {
    try {
      let key =
        Math.floor(Math.random() * 8323453452347834873462378483478) + 101;
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(`${key}`, saltOrRounds);
      let latestRecord = null;
      if (latestRecord) {
        latestRecord = await this.TaskModel.findOne({})
          .sort({ _id: -1 })
          .exec();
        latestRecord.loginKey = hash;
        console.log(hash);
        await latestRecord.save();
      } else {
        await this.TaskModel.create({ loginKey: hash });
      }
      this.logger.debug('Called when the current second is 45');
    } catch (error) {
      console.log(error);
    }
  }

  public async getAttendanceKey() {
    return this.TaskModel.findOne({}).lean();
  }
}
