// src/test/database-connection.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';

describe('Database Connection Test', () => {
  let module: TestingModule;

  beforeAll(async () => {
    // Créez un module de test en utilisant la configuration TypeORM
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',           // Utilisez le type de base de données correct
          host: 'localhost',       // Hôte de la base de données
          port: 3306,              // Port de la base de données
          username: 'root',        // Nom d'utilisateur de la base
          password: '',            // Mot de passe de la base
          database: 'studentcraft', // Nom de votre base de données
          entities: [],            // Ajoutez ici vos entités
          synchronize: false,
        }),
      ],
    }).compile();
  });

  it('should establish a database connection', async () => {
    const connection = getConnection();
    expect(connection.isConnected).toBeTruthy(); // Vérifie que la connexion est établie
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.close(); // Ferme la connexion après le test
  });
});
