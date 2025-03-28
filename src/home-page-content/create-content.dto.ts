import { IsString } from 'class-validator';

export class CreateContentDto {
  @IsString()
  key: string;

  @IsString()
  value: string;
}
