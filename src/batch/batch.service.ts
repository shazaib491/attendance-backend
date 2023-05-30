import { Injectable } from '@nestjs/common';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Batch } from './entities/batch.entity';

@Injectable()
export class BatchService {
  constructor(
    @InjectModel(Batch.name) private readonly BatchModel: Model<Batch>,
  ) {}

  //method for creating a batch
  create(createBatchDto: CreateBatchDto) {
    return this.BatchModel.create(createBatchDto);
  }

  //method for finding all batch
  findAll() {
    return this.BatchModel.find();
  }

  //method for finding a batch
  findOne(id: string) {
    return this.BatchModel.findById(id);
  }

  //method for updating  a batch
  update(id: string, updateBatchDto: UpdateBatchDto) {
    try {
      return this.BatchModel.findByIdAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        updateBatchDto,
      );
    } catch (error) {
      console.log(error);
    }
  }

  //method for removing a batch
  remove(id: string) {
    return this.BatchModel.deleteOne({ _id: id });
  }
}
