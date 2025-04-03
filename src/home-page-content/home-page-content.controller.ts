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
import { AuthGuard } from '@nestjs/passport';

@Controller('home-content')
export class HomePageContentController {
  constructor(private readonly contentService: HomePageContentService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('key') key: string) {
    return this.contentService.delete(key);
  }
}
