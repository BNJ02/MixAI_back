import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/dto/user.dto';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class UsersService {
  // Constructor
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // Create user
  async create(user: Partial<User>): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  // Find all users
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // Find user by email
  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // Find user by id
  async findOneById(id: number): Promise<User> {
    console.log('ID:', id);
    return this.usersRepository.findOne({ where: { id } });
  }

  // Find profile
  async findProfile(token: string): Promise<User> {
    const decoded = this.jwtService.decode(token) as any;
    const userEmail = decoded?.email;
    return this.findOneByEmail(userEmail);
  }

  // Find profile by user id
  public findProfileByUserId(userId: string): Observable<UserDto> {
    return from(this.findOneById(Number(userId))).pipe(
      map((user) => this._toUserDto(user)),
    );
  }

  private _toUserDto(user: User): UserDto {
    return {
      email: user.email,
      lastName: user.lastName,
      firstName: user.firstName,
      geminiAPIkey: user.geminiAPIkey,
    };
  }

  // Update profile
  async updateProfile(token: string, updateUserDto: UserDto): Promise<User> {
    const user = await this.findProfile(token);

    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }
}
