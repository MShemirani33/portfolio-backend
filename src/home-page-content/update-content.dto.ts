import { IsOptional, IsString } from 'class-validator';

export class UpdateContentDto {
  @IsOptional()
  @IsString()
  value?: string;
}
