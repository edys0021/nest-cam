import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPersonDto: CreatePersonDto) {
    return this.prisma.person.create({
      data: {
        username: createPersonDto.username,
        password: createPersonDto.password,
      },
    });
  }

  async findAll() {
    return this.prisma.person.findMany({
      include: {
        photos: true,
      },
    });
  }

  async findOne(id: number) {
    const person = await this.prisma.person.findUnique({
      where: { id },
      include: {
        photos: true,
      },
    });

    if (!person) {
      throw new NotFoundException(`Person dengan id ${id} tidak ditemukan`);
    }

    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    await this.findOne(id);

    return this.prisma.person.update({
      where: { id },
      data: updatePersonDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.person.delete({
      where: { id },
    });
  }
}