import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length, Matches } from 'class-validator';

export class CreatePessoaDto {
  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsString()
  @Length(11, 11)
  @Matches(/^[0-9]+$/, { message: 'CPF deve conter apenas números' })
  cpf: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
