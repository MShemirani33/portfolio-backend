import { ApiProperty } from '@nestjs/swagger';

export class CreateGalleryDto {
  @ApiProperty({ example: 2, description: 'ID پروژه والد' })
  portfolioId: number;

  @ApiProperty({
    example: '/uploads/image.webp',
    description: 'آدرس عکس گالری',
  })
  imageUrl: string;
}
