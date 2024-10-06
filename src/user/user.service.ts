import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Récupérer tous les utilisateurs
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Trouver un utilisateur par ID
  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  // Créer un nouvel utilisateur
  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  // Mettre à jour un utilisateur
  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  // Supprimer un utilisateur
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
