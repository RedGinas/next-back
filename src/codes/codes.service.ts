import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Code } from './entities/code.entity';
import { Repository } from 'typeorm';
import * as jsonData from '../data/codes.json';

@Injectable()
export class CodesService implements OnModuleInit {
  constructor(
    @InjectRepository(Code)
    private CodesRepository: Repository<Code>,
  ) {}

  async onModuleInit() {
    const codesDB = await this.CodesRepository.find();
    if (codesDB.length === 0) {
      const codes: CreateCodeDto[] = JSON.parse(JSON.stringify(jsonData)).map(
        (el) => ({
          alphabeticCode: el.AlphabeticCode,
          entity: el.Entity,
          currency: el.Currency,
          isEnable: false,
        }),
      );
      console.log(codes.find((el) => !el.alphabeticCode));
      this.CodesRepository.insert(codes);
    }
  }

  findAll() {
    return this.CodesRepository.find({ order: { id: 'ASC' } });
  }

  async update(id: number, updateCodeDto: UpdateCodeDto) {
    try {
      await this.CodesRepository.update(id, updateCodeDto);
      const response = this.CodesRepository.findOne({
        where: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
