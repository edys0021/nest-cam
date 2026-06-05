import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PersonsService } from '../persons/persons.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Injectable()
export class PhotosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly personsService: PersonsService,
  ) {}

  async create(personId: number, createPhotoDto: CreatePhotoDto) {
    await this.personsService.findOne(personId);

    return this.prisma.photo.create({
      data: {
        personId,
        imageBase64: createPhotoDto.imageBase64,
      },
    });
  }

  async findAllByPerson(personId: number) {
    await this.personsService.findOne(personId);

    return this.prisma.photo.findMany({
      where: {
        personId,
      },
    });
  }

  async findOne(id: number) {
    const photo = await this.prisma.photo.findUnique({
      where: { id },
      include: {
        person: true,
      },
    });

    if (!photo) {
      throw new NotFoundException(`Photo dengan id ${id} tidak ditemukan`);
    }

    return photo;
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto) {
    await this.findOne(id);

    return this.prisma.photo.update({
      where: { id },
      data: updatePhotoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.photo.delete({
      where: { id },
    });
  }
}