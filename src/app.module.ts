import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './products/product.module'; // Importer le ProductModule
import { User } from './user/entities/user.entity';
import { Product } from './products/product.entity'; // Importer l'entité Product si nécessaire

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // Modifiez le mot de passe selon votre configuration
      database: 'student_craft',
      entities: [User, Product], // Ajoutez Product ici
      synchronize: true, // Crée automatiquement les tables
    }),
    UserModule,
    AuthModule, // Assurez-vous que AuthModule est ici
    ProductModule, // Ajoutez le ProductModule ici
  ],
})
export class AppModule {}
