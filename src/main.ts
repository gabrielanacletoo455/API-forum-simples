import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
  .setTitle('CondfyNews')
  .setDescription('Todas as rotas da nossa API.')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true
  })
  await app.listen(+configService.get('APP_PORT') || 3000);
}
bootstrap();
