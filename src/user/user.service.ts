import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Récupérer tous les utilisateurs
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Récupérer un utilisateur par son ID
  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  // Créer un utilisateur
  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  // Mettre à jour un utilisateur
  update(id: number, updateUser: Partial<User>): Promise<User> {
    return this.userRepository.save({ ...updateUser, id });
  }

  // Supprimer un utilisateur
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  // Mettre à jour le chemin du document uploadé
  async updateDocumentPath(id: number, path: string): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    user.documentPath = path;
    return this.userRepository.save(user);
  }

  // Vérifier l'utilisateur par l'admin
  async verifyUser(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    user.isVerified = true;  // Marque l'utilisateur comme vérifié
    return this.userRepository.save(user);
  }

  // Rejeter l'utilisateur par l'admin
  async rejectUser(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    user.isVerified = false;  // Marque l'utilisateur comme rejeté
    return this.userRepository.save(user);
  }
}
