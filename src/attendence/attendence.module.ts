import { Logger, Module, forwardRef } from '@nestjs/common';
import { AttendenceService } from './attendence.service';
import { AttendenceController } from './attendence.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendance, AttendanceSchema } from './schema/attendence.schema';
import { TaskService } from 'src/task/task.service';
import { TaskSchema } from 'src/task/schema/task.model';
import { AppModule } from 'src/app.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Attendance.name, schema: AttendanceSchema },
      { name: TaskService.name, schema: TaskSchema },
    ]),
    forwardRef(() => AppModule),
  ],
  controllers: [AttendenceController],
  providers: [AttendenceService,Logger],
})
export class AttendenceModule {}
