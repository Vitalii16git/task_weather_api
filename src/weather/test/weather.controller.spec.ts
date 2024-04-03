import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from '../weather.controller';
import { WeatherService } from '../weather.service';
import { getRepositoryToken } from '@nestjs/typeorm'; // Import getRepositoryToken
import { WeatherEntity } from '../entities/weather.entity';
import { ConfigService } from '@nestjs/config'; // Import ConfigService

describe('WeatherController', () => {
  let controller: WeatherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        WeatherService,
        {
          provide: getRepositoryToken(WeatherEntity), // Provide WeatherEntityRepository token
          useClass: WeatherEntity, // Use WeatherEntity class as a mock
        },
        {
          provide: ConfigService, // Provide ConfigService
          useValue: {
            // Mock ConfigService methods if needed
          },
        },
      ],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
