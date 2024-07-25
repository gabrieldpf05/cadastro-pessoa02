import { Test, TestingModule } from '@nestjs/testing';
import { PessoaService } from './pessoa.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Pessoa } from '@prisma/client';

describe('PessoaService', () => {
  let service: PessoaService;
  let prisma: PrismaService;

  const pessoaArray = [
    { id: 1, nome: 'João da Silva', cpf: '12345678901', email: 'joao@exemplo.com' },
    { id: 2, nome: 'Maria Oliveira', cpf: '10987654321', email: 'maria@exemplo.com' },
  ];

  const db = {
    pessoa: {
      findMany: jest.fn().mockResolvedValue(pessoaArray),
      findUnique: jest.fn().mockResolvedValue(pessoaArray[0]),
      create: jest.fn().mockReturnValue(pessoaArray[0]),
      update: jest.fn().mockResolvedValue(pessoaArray[0]),
      delete: jest.fn().mockResolvedValue(pessoaArray[0]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PessoaService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<PessoaService>(PessoaService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar uma pessoa', async () => {
    const pessoa: Prisma.PessoaCreateInput = {
      nome: 'João da Silva',
      cpf: '12345678901',
      email: 'joao@exemplo.com',
    };
    await expect(service.create(pessoa)).resolves.toEqual(pessoaArray[0]);
    expect(prisma.pessoa.create).toHaveBeenCalledWith({ data: pessoa });
  });

  it('deve retornar todas as pessoas', async () => {
    await expect(service.findAll()).resolves.toEqual(pessoaArray);
    expect(prisma.pessoa.findMany).toHaveBeenCalled();
  });

  it('deve retornar uma pessoa pelo ID', async () => {
    const id = 1;
    await expect(service.findOne(id)).resolves.toEqual(pessoaArray[0]);
    expect(prisma.pessoa.findUnique).toHaveBeenCalledWith({ where: { id } });
  });

  it('deve atualizar uma pessoa', async () => {
    const id = 1;
    const updateData: Prisma.PessoaUpdateInput = {
      nome: 'João da Silva',
      cpf: '12345678901',
      email: 'joao@exemplo.com',
    };
    await expect(service.update(id, updateData)).resolves.toEqual(pessoaArray[0]);
    expect(prisma.pessoa.update).toHaveBeenCalledWith({ where: { id }, data: updateData });
  });

  it('deve remover uma pessoa', async () => {
    const id = 1;
    await expect(service.remove(id)).resolves.toEqual(pessoaArray[0]);
    expect(prisma.pessoa.delete).toHaveBeenCalledWith({ where: { id } });
  });
});
