import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  thumbnail: string;

  @IsOptional()
  @IsString()
  shortDesc?: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  galleryImages?: string[]; 
}
