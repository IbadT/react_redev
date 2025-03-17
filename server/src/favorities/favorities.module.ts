import { Module } from '@nestjs/common';
import { FavoritiesService } from './favorities.service';
import { FavoritiesController } from './favorities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity } from './entities/favority.entity';
import { VideoEntity } from 'src/videos/entities/video.entity';
import { VideosService } from 'src/videos/videos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoriteEntity, VideoEntity
    ])
  ],
  controllers: [FavoritiesController],
  providers: [FavoritiesService, VideosService],
})
export class FavoritiesModule {}
