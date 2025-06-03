import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '..', 'ssl', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'ssl', 'cert.pem')),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });

  const user = process.env.SWAGGER_USER;
  const password = process.env.SWAGGER_PASS;

  if (!user || !password) {
    throw new Error(
      'SWAGGER_USER ou SWAGGER_PASS não foram definidos no ambiente',
    );
  }

  app.enableCors({
    origin: '*',
    methods: '*',
  });

  app.use(
    ['/api'],
    basicAuth({
      users: { [user]: password },
      challenge: true,
    }),
  );

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
