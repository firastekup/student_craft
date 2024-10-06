import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',  // Modifiez le mot de passe selon votre configuration
      database: 'student_craft',
      entities: [User],
      synchronize: true,  // Crée automatiquement les tables
    }),
    UserModule,
    AuthModule,  // Assurez-vous que AuthModule est ici
  ],
})
export class AppModule {}
