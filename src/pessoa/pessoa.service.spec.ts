import { Test, TestingModule } from '@nestjs/testing';
import { PessoaService } from './pessoa.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PessoaService', () => {
  let service: PessoaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PessoaService, PrismaService],
    }).compile();

    service = module.get<PessoaService>(PessoaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a pessoa', async () => {
    const pessoa = await service.create({
      nome: 'John Doe',
      cpf: '12345678901',
      email: 'john.doe@example.com',
    });
    expect(pessoa).toBeDefined();
    expect(pessoa.nome).toBe('John Doe');
  });

  it('should find all pessoas', async () => {
    const pessoas = await service.findAll();
    expect(pessoas).toBeDefined();
    expect(pessoas.length).toBeGreaterThan(0);
  });

  it('should find one pessoa', async () => {
    const pessoa = await service.findOne(1);
    expect(pessoa).toBeDefined();
    expect(pessoa.id).toBe(1);
  });

  it('should update a pessoa', async () => {
    const pessoa = await service.update(1, { nome: 'Jane Doe' });
    expect(pessoa).toBeDefined();
    expect(pessoa.nome).toBe('Jane Doe');
  });

  it('should delete a pessoa', async () => {
    const pessoa = await service.remove(1);
    expect(pessoa).toBeDefined();
  });
});
