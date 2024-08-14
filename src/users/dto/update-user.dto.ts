import { IsString, IsOptional, IsEmail, IsUrl } from 'class-validator';
import { UserRole } from '../user.entity';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  role: UserRole;

  @IsUrl()
  @IsOptional()
  avatarUrl: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @IsOptional()
  password: string;

  constructor(partial: Partial<UpdateUserDto>) {
    Object.assign(this, partial);
  }
}
