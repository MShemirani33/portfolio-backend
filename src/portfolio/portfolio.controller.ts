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
import { AuthGuard } from '@nestjs/passport';

@Controller('portfolios')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string) {
    return this.portfolioService.delete(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() dto: UpdatePortfolioDto) {
    return this.portfolioService.update(+id, dto);
  }
}
