import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PersonsModule } from '../persons/persons.module';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';

@Module({
  imports: [PrismaModule, PersonsModule],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}