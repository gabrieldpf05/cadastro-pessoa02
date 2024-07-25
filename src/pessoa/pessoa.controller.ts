import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus, Res, UseInterceptors } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';

@ApiTags('Pessoas')
@Controller('pessoas')
@UseInterceptors(ResponseInterceptor)
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar nova pessoa' })
  @ApiResponse({ status: 201, description: 'Pessoa criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() createPessoaDto: CreatePessoaDto, @Res() res: Response) {
    try {
      const pessoa = await this.pessoaService.create(createPessoaDto);
      return res.status(HttpStatus.CREATED).json(pessoa);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad Request',
      });
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar todas as pessoas' })
  @ApiResponse({ status: 200, description: 'Lista de pessoas retornada com sucesso.' })
  async findAll(@Res() res: Response) {
    const pessoas = await this.pessoaService.findAll();
    return res.status(HttpStatus.OK).json(pessoas);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obter pessoa por ID' })
  @ApiResponse({ status: 200, description: 'Pessoa retornada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Pessoa não encontrada.' })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const pessoa = await this.pessoaService.findOne(+id);
      return res.status(HttpStatus.OK).json(pessoa);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not Found',
      });
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar pessoa por ID' })
  @ApiResponse({ status: 200, description: 'Pessoa atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Pessoa não encontrada.' })
  async update(@Param('id') id: string, @Body() updatePessoaDto: UpdatePessoaDto, @Res() res: Response) {
    try {
      const pessoa = await this.pessoaService.update(+id, updatePessoaDto);
      return res.status(HttpStatus.OK).json(pessoa);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not Found',
      });
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deletar pessoa por ID' })
  @ApiResponse({ status: 200, description: 'Pessoa deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Pessoa não encontrada.' })
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const pessoa = await this.pessoaService.remove(+id);
      return res.status(HttpStatus.OK).json(pessoa);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not Found',
      });
    }
  }
}
