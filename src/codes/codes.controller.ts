import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CodesService } from './codes.service';
import { UpdateCodeDto } from './dto/update-code.dto';

@Controller('codes')
export class CodesController {
  constructor(private readonly codesService: CodesService) {}

  @Get()
  async findAll() {
    const data = await this.codesService.findAll();
    console.log(data.length);
    return data;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCodeDto: UpdateCodeDto) {
    try {
      return await this.codesService.update(+id, updateCodeDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return;
  }
}
