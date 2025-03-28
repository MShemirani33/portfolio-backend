import { IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  title: string;
}
