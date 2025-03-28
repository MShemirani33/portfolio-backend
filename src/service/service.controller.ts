import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './create-service.dto';
import { UpdateServiceDto } from './update-service.dto';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  create(@Body() dto: CreateServiceDto) {
    return this.serviceService.create(dto);
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return this.serviceService.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.serviceService.delete(+id);
  }
}
