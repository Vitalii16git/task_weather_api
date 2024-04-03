import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { Repository } from 'typeorm';
import { WeatherEntity } from './entities/weather.entity';
import { WeatherGetQueryDto } from './dto/weather-get-query.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ErrorEnum } from '../shared/enums/error.enum';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(WeatherEntity)
    private readonly weatherRepository: Repository<WeatherEntity>,
    private readonly configService: ConfigService,
  ) {}

  private generateRequestString(
    lat: number,
    lon: number,
    excludeList: string,
  ): string {
    const apiKey = this.configService.get<string>('OPEN_WEATHER_API_KEY');
    const baseUrl = this.configService.get<string>('OPEN_WEATHER_API_BASE_URL');

    return `${baseUrl}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${excludeList}&appid=${apiKey}`;
  }

  async getWeather(
    lat: number,
    lon: number,
    excludeList: string,
  ): Promise<AxiosResponse<any>> {
    const requestUrl = this.generateRequestString(lat, lon, excludeList);

    const response = await axios.get(requestUrl).catch((error) => {
      // TODO: use logger instead of console
      console.error('error :', error.stack);
      throw new BadRequestException({
        message: ErrorEnum.fetchingWeatherDataError,
      });
    });

    return response;
  }

  async saveWeatherData(data: WeatherEntity): Promise<WeatherEntity> {
    return await this.weatherRepository.save(data);
  }

  async getWeatherData(query: WeatherGetQueryDto): Promise<WeatherEntity[]> {
    const { lat, lon } = query;

    const result = await this.weatherRepository.find({
      where: { lat, lon },
    });

    return result;
  }
}
