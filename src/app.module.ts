import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonsModule } from './persons/persons.module';
import { PhotosModule } from './photos/photos.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), PersonsModule, PhotosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
