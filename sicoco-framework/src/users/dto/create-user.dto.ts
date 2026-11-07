import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Alice Smith', description: 'The name of the user' })
  name: string;

  @ApiProperty({ example: 'alice@example.com', description: 'Unique email address' })
  email: string;

  @ApiPropertyOptional({ example: 25, description: 'Age of the user' })
  age?: number;
}
