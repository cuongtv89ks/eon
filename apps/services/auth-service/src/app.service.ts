import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AppService {
  register(createUserDto: CreateUserDto) {
    // TODO: Hash password with bcrypt
    // TODO: Save user to database
    console.log('Registering user:', createUserDto);
    return { message: 'User registered successfully' };
  }

  login(loginUserDto: LoginUserDto) {
    // TODO: Find user in database
    // TODO: Compare passwords
    // TODO: Generate and return JWT
    console.log('Logging in user:', loginUserDto);
    return { token: 'dummy-jwt-token' };
  }
}
