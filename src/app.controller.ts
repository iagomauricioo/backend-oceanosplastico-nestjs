import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get()
  getHome(@Res() res: Response) {
    const html = `
    <!DOCTYPE html>
    <html lang="pt">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Oceanos de Plástico</title>
    </head>
    <body>
        <h1>API do Projeto Oceanos de Plástico!!</h1>
        <a href="https://api.oceanosdeplastico.com.br/api"><h2>Swagger UI</h2></a>
    </body>
    </html>
  `;
    return res.send(html);
  }
}
