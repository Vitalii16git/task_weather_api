import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherResponseInterceptor } from './interceptors/weather-response.interceptor';
import { WeatherGetQueryDto } from './dto/weather-get-query.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { WeatherDataDto } from './dto/weather-data.dto';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { ErrorMessageDto } from '../shared/dto/error.message.dto';
import { WeatherEntity } from './entities/weather.entity';
import { excludeList } from './consts/exclude-list.const';

@ApiTags('Weather')
@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Post()
  @ApiOperation({
    summary: 'Fetch and save weather data by latitude and longitude',
  })
  @ApiCreatedResponse({
    description: 'Weather data fetched and saved successfully',
    type: WeatherDataDto,
  })
  @ApiBadRequestResponse({
    description: 'Weather data fetching error',
    type: ErrorMessageDto,
  })
  async fetchAndSaveWeatherData(
    @Body() body: CreateWeatherDto,
  ): Promise<WeatherDataDto> {
    const { lat, lon } = body;

    const getWeather = await this.weatherService.getWeather(
      lat,
      lon,
      excludeList,
    );
    const { data } = getWeather;

    await this.weatherService.saveWeatherData(data);

    return data;
  }

  @Get()
  @ApiOperation({ summary: 'Get weather data by latitude and longitude' })
  @ApiOkResponse({
    description: 'Weather data retrieved successfully',
    type: [WeatherDataDto],
  })
  @UseInterceptors(WeatherResponseInterceptor)
  async getWeatherData(
    @Query() query: WeatherGetQueryDto,
  ): Promise<WeatherEntity[]> {
    const weatherData = await this.weatherService.getWeatherData(query);
    return weatherData;
  }
}
