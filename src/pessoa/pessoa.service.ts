import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Pessoa } from '@prisma/client';

@Injectable()
export class PessoaService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PessoaCreateInput): Promise<Pessoa> {
    try {
      return this.prisma.pessoa.create({ data });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('CPF ou Email já existe.');
      }
      throw new BadRequestException('Erro ao criar pessoa.');
    }
  }

  async findAll(): Promise<Pessoa[]> {
    return this.prisma.pessoa.findMany();
  }

  async findOne(id: number): Promise<Pessoa> {
    const pessoa = await this.prisma.pessoa.findUnique({ where: { id } });
    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada');
    }
    return pessoa;
  }

  async update(id: number, data: Prisma.PessoaUpdateInput): Promise<Pessoa> {
    try {
      return this.prisma.pessoa.update({ where: { id }, data });
    } catch (error) {
      throw new NotFoundException('Pessoa não encontrada');
    }
  }

  async remove(id: number): Promise<Pessoa> {
    try {
      return this.prisma.pessoa.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Pessoa não encontrada');
    }
  }
}
