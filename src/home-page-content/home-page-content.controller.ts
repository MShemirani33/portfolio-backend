import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HomePageContentService } from './home-page-content.service';
import { CreateContentDto } from './create-content.dto';

@Controller('home-content')
export class HomePageContentController {
  constructor(private readonly contentService: HomePageContentService) {}

  @Post()
  upsert(@Body() dto: CreateContentDto) {
    return this.contentService.upsert(dto);
  }

  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.contentService.findByKey(key);
  }

  @Delete(':key')
  delete(@Param('key') key: string) {
    return this.contentService.delete(key);
  }
}
