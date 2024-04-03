import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class WeatherDataDto {
  @ApiProperty({ description: 'Sunrise time in UNIX timestamp format' })
  @IsNumber()
  sunrise: number;

  @ApiProperty({ description: 'Sunset time in UNIX timestamp format' })
  @IsNumber()
  sunset: number;

  @ApiProperty({ description: 'Temperature in Kelvin' })
  @IsNumber()
  temp: number;

  @ApiProperty({ description: 'Feels like temperature in Kelvin' })
  @IsNumber()
  feels_like: number;

  @ApiProperty({ description: 'Atmospheric pressure in hPa' })
  @IsNumber()
  pressure: number;

  @ApiProperty({ description: 'Humidity in percentage' })
  @IsNumber()
  humidity: number;

  @ApiProperty({ description: 'UV Index' })
  @IsNumber()
  uvi: number;

  @ApiProperty({ description: 'Wind speed in meter/sec' })
  @IsNumber()
  wind_speed: number;
}
