import { Controller, Post, Get, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() dto: CreateContactDto) {
    return this.contactService.create(dto);
  }

  @Get()
  findAll() {
    return this.contactService.findAll();
  }
}
