import { ConfigService } from '@nestjs/config';

export const getDbConnection = (configService: ConfigService) => {
  const defaults = {
    type: configService.get('DB_TYPE'),
    port: configService.get<number>('DB_PORT'),
    host: configService.get('DB_HOST'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: true,
  };
  return defaults;
};
