/* eslint-disable @typescript-eslint/unbound-method */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';
import { NoCacheMiddleware } from './middleware/no-cache-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const user = process.env.SWAGGER_USER;
  const password = process.env.SWAGGER_PASS;

  if (!user || !password) {
    throw new Error(
      'SWAGGER_USER ou SWAGGER_PASS não foram definidos no ambiente',
    );
  }

  app.use(new NoCacheMiddleware().use);

  app.use(
    ['/api'],
    basicAuth({
      users: { [user]: password },
      challenge: true,
    }),
  );

  app.enableCors({
    origin: process.env.URL_CORS ?? 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Oceanos de Plástico Docs')
    .setDescription(
      'Essa documentação contém as rotas necessárias para se fazer o uso dessa API',
    )
    .setVersion('1.0')
    .addTag('LERE')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 8080;
  await app.listen(port);
  console.log(`🚀 Server is running at http://localhost:${port}`);
  console.log(`🚀 Swagger/OpenAPI http://localhost:${port}/api`);
}

// Inicia a aplicação e captura erros
bootstrap().catch((error) => {
  console.error('Error during bootstrap:', error);
});
