import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Inscription de l'utilisateur avec hachage du mot de passe
  async register(username: string, email: string, password: string): Promise<User> {
    // Vérifier si l'email existe déjà
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('L\'email est déjà utilisé par un autre utilisateur.');
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      isVerified: false, // Assurez-vous d'initialiser cette propriété lors de la création de l'utilisateur
    });

    // Enregistrer l'utilisateur dans la base de données
    return this.userRepository.save(newUser);
  }

  // Vérification du mot de passe et connexion
  async validateUser(email: string, password: string): Promise<User> {
    // Trouver l'utilisateur par email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides.');
    }

    // Vérifiez si l'utilisateur est vérifié
    if (!user.isVerified) {
      throw new UnauthorizedException('Votre compte n\'est pas encore vérifié.');
    }

    // Comparer le mot de passe haché
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mot de passe incorrect.');
    }

    return user;
  }
}
