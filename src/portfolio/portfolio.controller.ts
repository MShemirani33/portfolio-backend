import { CreatePortfolioDto } from './create-portfolio.dto';
import { PortfolioService } from './portfolio.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UpdatePortfolioDto } from './update-portfolio.dto';


@Controller('portfolios')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  create(@Body() dto: CreatePortfolioDto) {
    return this.portfolioService.create(dto);
  }

  @Get()
  findAll() {
    return this.portfolioService.findALL();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portfolioService.findOne(+id);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.portfolioService.findBySlug(slug);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.portfolioService.delete(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePortfolioDto) {
    return this.portfolioService.update(+id, dto);
  }
}
