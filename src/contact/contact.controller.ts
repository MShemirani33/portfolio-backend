import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './create-contact.dto';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() dto: CreateContactDto) {
    return this.contactService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.contactService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت یک پیام و علامت‌گذاری به‌عنوان خوانده‌شده' })
  @UseGuards(AuthGuard('jwt'))
  getOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف یک پیام' })
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string) {
    return this.contactService.delete(+id);
  }

  @Get('stats/unread')
  @ApiOperation({ summary: 'تعداد پیام‌های خوانده‌نشده' })
  @UseGuards(AuthGuard('jwt'))
  countUnread() {
    return this.contactService.countUnread();
  }
}
