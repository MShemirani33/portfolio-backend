import { Controller, Post, Delete, Get, Param, Body } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @ApiOperation({ summary: 'افزودن چند تصویر به گالری' })
  async addImagesBulk(@Body() body: { portfolioId: number; images: string[] }) {
    return this.galleryService.addImagesBulk(body.portfolioId, body.images);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف یک تصویر گالری' })
  async deleteImage(@Param('id') id: string) {
    return this.galleryService.deleteImage(+id);
  }

  @Get('/portfolio/:portfolioId')
  @ApiOperation({ summary: 'دریافت گالری یک پروژه خاص' })
  async getByPortfolio(@Param('portfolioId') portfolioId: string) {
    return this.galleryService.getGalleryByPortfolio(+portfolioId);
  }
}
