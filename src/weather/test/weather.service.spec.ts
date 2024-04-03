import * as dotenv from 'dotenv';
dotenv.config();
import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from '../weather.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WeatherEntity } from '../entities/weather.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import { BadRequestException } from '@nestjs/common';
import { excludeList } from '../consts/exclude-list.const';
import { ConfigService } from '@nestjs/config';

describe('WeatherService', () => {
  let service: WeatherService;
  let weatherRepository: Repository<WeatherEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: getRepositoryToken(WeatherEntity),
          useClass: Repository,
        },
        ConfigService, // Include ConfigService in providers
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
    weatherRepository = module.get<Repository<WeatherEntity>>(
      getRepositoryToken(WeatherEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getWeather', () => {
    it('should return weather data', async () => {
      // Mocking the axios.get function to resolve with mock weather data
      const mockWeatherData = {
        data: 'mocked weather data',
      };
      jest.spyOn(axios, 'get').mockResolvedValue(mockWeatherData);

      const lat = 123;
      const lon = 456;

      const result = await service.getWeather(lat, lon, excludeList);

      expect(result).toEqual(mockWeatherData);
      expect(axios.get).toHaveBeenCalledWith(expect.any(String));
    });

    it('should throw BadRequestException when axios.get rejects', async () => {
      // Mocking the axios.get function to reject with a mocked error
      jest.spyOn(axios, 'get').mockRejectedValue(new Error('Mocked error'));

      const lat = 123;
      const lon = 456;
      const excludeList = 'minutely,hourly,daily,alerts';

      await expect(service.getWeather(lat, lon, excludeList)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('saveWeatherData', () => {
    it('should save weather data', async () => {
      // Mock weather data
      const mockWeatherData: WeatherEntity = {
        id: 1,
        lat: 33.44,
        lon: -94.04,
        timezone: 'America/Chicago',
        timezone_offset: -18000,
        current: {
          dt: 1712171755,
          sunrise: 1712145617,
          sunset: 1712191072,
          temp: 292.06,
          feels_like: 290.74,
          pressure: 1010,
          humidity: 28,
          dew_point: 273.17,
          uvi: 6.81,
          clouds: 0,
          visibility: 10000,
          wind_speed: 9.26,
          wind_deg: 310,
          wind_gust: 13.38,
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: 'clear sky',
              icon: '01d',
            },
          ],
        },
      };

      // Mocking the weatherRepository.save function to resolve with mock weather data
      jest.spyOn(weatherRepository, 'save').mockResolvedValue(mockWeatherData);

      const result = await service.saveWeatherData(mockWeatherData);

      expect(result).toEqual(mockWeatherData);
    });
  });
});
