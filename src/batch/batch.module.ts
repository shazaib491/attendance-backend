import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { BatchController } from './batch.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Batch } from './entities/batch.entity';
import { BatchSchema } from './dto/schema/batch.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Batch.name, schema: BatchSchema }])],
  controllers: [BatchController],
  providers: [BatchService]
})
export class BatchModule {}
