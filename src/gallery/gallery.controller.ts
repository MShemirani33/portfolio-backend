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

  @Delete(':portfolioId/:imageId')
  @ApiOperation({ summary: 'حذف یک تصویر گالری از پروژه مشخص' })
  async deleteImageFromPortfolio(
    @Param('portfolioId') portfolioId: string,
    @Param('imageId') imageId: string,
  ) {
    return this.galleryService.deleteImageFromPortfolio(+portfolioId, +imageId);
  }

  @Get('/portfolio/:portfolioId')
  @ApiOperation({ summary: 'دریافت گالری یک پروژه خاص' })
  async getByPortfolio(@Param('portfolioId') portfolioId: string) {
    return this.galleryService.getGalleryByPortfolio(+portfolioId);
  }

  @Get(':portfolioId/:imageId')
  @ApiOperation({ summary: 'دریافت یک عکس از گالری یک پروژه خاص' })
  async getImageFromPortfolio(
    @Param('portfolioId') portfolioId: string,
    @Param('imageId') imageId: string,
  ) {
    return this.galleryService.getImageFromPortfolio(+portfolioId, +imageId);
  }
}
