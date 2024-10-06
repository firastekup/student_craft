import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Récupérer tous les utilisateurs
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Récupérer un utilisateur par son ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  // Créer un nouvel utilisateur avec image
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Dossier où les fichiers sont stockés
        filename: (req, file, callback) => {
          // Génère un nom unique pour le fichier
          const filename = `${Date.now()}-${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async create(
    @Body() user: User,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    if (file) {
      user.documentPath = file.path; // Enregistre le chemin du fichier
    }
    return this.userService.create(user);
  }

  // Mettre à jour un utilisateur existant
  @Patch(':id')
  update(@Param('id') id: string, @Body() user: Partial<User>): Promise<User> {
    return this.userService.update(+id, user);
  }

  // Supprimer un utilisateur par son ID
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(+id);
  }

  // Vérifier l'utilisateur par l'admin
  @Patch(':id/verify')
  async verifyUser(@Param('id') id: string): Promise<User> {
    return this.userService.verifyUser(+id);
  }

  // Endpoint pour refuser la validation de l'utilisateur
  @Patch(':id/reject')
  async rejectUser(@Param('id') id: string): Promise<User> {
    return this.userService.rejectUser(+id);
  }
}
