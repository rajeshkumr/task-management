import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name); // Create a logger instance

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, password } = registerDto;

    // Check if username already exists
    const userExists = await this.userRepository.findOne({
      where: { username },
    });
    if (userExists) {
      this.logger.warn(
        `Registration failed: Username ${username} already exists`,
      );
      throw new BadRequestException('Username is already taken');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    await this.userRepository.save(user);

    this.logger.log(`User ${username} registered successfully`);
    return this.createToken(user);
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    // Find the user by username
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      this.logger.warn(`Login failed: Invalid credentials for ${username}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      this.logger.warn(`Login failed: Invalid password for ${username}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.log(`User ${username} logged in successfully`);
    return this.createToken(user);
  }

  private createToken(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
