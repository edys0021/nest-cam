import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Controller('photos')
export class PhotosController {
    constructor(private readonly photosService: PhotosService) { }

    @Post('/:personId/photos')
    async create(@Param('personId') personId: string,
        @Body() createPhotoDto: CreatePhotoDto) {
        return this.photosService.create(Number(personId), createPhotoDto);
    }

    @Get('persons/:personId/photos')
    findAllByPerson(@Param('personId') personId: string) {
        return this.photosService.findAllByPerson(Number(personId));
    }
}
