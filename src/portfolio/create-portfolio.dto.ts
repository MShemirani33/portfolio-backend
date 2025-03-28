import { IsString } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  thumbnail: string;

  @IsString()
  shortDesc: string;

  @IsString()
  content: string;
}
