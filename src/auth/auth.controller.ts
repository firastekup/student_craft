import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity'; // Si vous en avez besoin pour le typage

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Route pour l'inscription des utilisateurs
  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res,
  ): Promise<any> {
    try {
      const user: User = await this.authService.register(username, email, password);
      return res.status(HttpStatus.CREATED).json({
        message: 'Inscription réussie !',
        user,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Erreur lors de l\'inscription.',
        error: error.message,
      });
    }
  }

  // Route pour la connexion des utilisateurs
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res,
  ): Promise<any> {
    try {
      const user: User = await this.authService.validateUser(email, password);
      return res.status(HttpStatus.OK).json({
        message: 'Connexion réussie !',
        user,
      });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Erreur lors de la connexion.',
        error: error.message,
      });
    }
  }
}
