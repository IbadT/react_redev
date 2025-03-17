import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  app.enableCors();
  app.use(bodyParser.json({ limit: "15mb" }))
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

  const config = new DocumentBuilder()
  .setTitle('Youtube SPA documentation')
  .addTag('youtube-spa')
  .setDescription('The youtube-spa API description')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT Token',
      in: 'header',
    },
    'JWT-auth',
  )
  .build(); 

  const document = SwaggerModule.createDocument(app, config);
  if (process.env.NODE_ENV !== 'production') {
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
