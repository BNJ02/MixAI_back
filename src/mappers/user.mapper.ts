import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/user/user.entity';

export class UserMapper {
  static mapToUserDto(user: User): UserDto {
    const userDto: UserDto = {
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      email: user.email ?? '',
    };

    return userDto;
  }
}
