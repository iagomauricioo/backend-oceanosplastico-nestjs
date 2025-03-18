import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const user = process.env.SWAGGER_USER
  const password = process.env.SWAGGER_PASS;
  
  if (!password) {
    throw new Error('SWAGGER_PASS environment variable is not defined');
  }

  app.use(
    ['/api'],
    basicAuth({
      users: { user: password }, 
      challenge: true, // Solicita autenticação no navegador
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

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Server is running at http://localhost:${port}`);
  console.log(`🚀 Swagger/OpenAPI http://localhost:${port}/api`);
}

// Inicia a aplicação e captura erros
bootstrap().catch((error) => {
  console.error('Error during bootstrap:', error);
});
