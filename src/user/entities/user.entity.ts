import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'student' })
  role: string;  // Rôle de l'utilisateur : 'student' ou 'admin'

  @Column({ nullable: true })
  documentPath: string;  // Chemin de l'image de la carte étudiante

  @Column({ default: false })
  isVerified: boolean;  // Statut de vérification par l'admin
}
