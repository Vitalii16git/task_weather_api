import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

(async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors({});
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const configService: ConfigService = app.get(ConfigService);
  const currentVersion = configService.get('API_VERSION');

  const config = new DocumentBuilder()
    .setTitle('Weather Api')
    .setDescription('Weather Api')
    .setVersion(currentVersion)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(configService.get<string>('SITE_PREFIX'), app, document);

  await app.listen(configService.get<string>('PORT') || 3501);
})();
