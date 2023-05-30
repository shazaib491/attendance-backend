import { Logger, Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BatchModule } from './batch/batch.module';
import { AuthModule } from './auth/auth.module';
import { AttendenceModule } from './attendence/attendence.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task/task.service';
import { Task, TaskSchema } from './task/schema/task.model';
@Module({
  imports: [
    BatchModule,
    AuthModule,
    AttendenceModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://shazaib:SiXRsiFbbjhnrTcL@nodejscluster.dkico.mongodb.net/attendance-tracker`,
    ),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    forwardRef(() => AttendenceModule),
  ],
  exports: [MongooseModule],
  controllers: [AppController],
  providers: [AppService, TaskService,Logger],
})
export class AppModule {}
