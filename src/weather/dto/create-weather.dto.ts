import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max, IsString } from 'class-validator';

export class CreateWeatherDto {
  @ApiProperty()
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;

  @ApiProperty()
  @IsNumber()
  @Min(-180)
  @Max(180)
  lon: number;
}
