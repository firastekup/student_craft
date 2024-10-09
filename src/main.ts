import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Active CORS pour permettre les requêtes depuis d'autres origines
  app.enableCors({
    origin: 'http://localhost:3001', // Change cette URL si nécessaire
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Méthodes autorisées
    credentials: true, // Autoriser les cookies
  });

  await app.listen(3000); // Port du backend
}
bootstrap();
